/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { addComment } from './addComment'

describe('Add comment resolver', () => {
  test('should invoke prismaMock create', async () => {
    prismaMock.comment.create.mockResolvedValue({
      authorId: 1,
      content: 'testing',
      createdAt: '2021-05-11T18:04:47.698Z',
      fileName: 'testFile.js',
      id: 2,
      line: 1,
      submissionId: 1
    })
    expect(
      await addComment(
        {},
        {
          line: 1,
          submissionId: 1,
          fileName: 'testFile.js',
          content: 'testing'
        },

        { req: { user: { id: 1 } } }
      )
    ).toEqual({
      authorId: 1,
      content: 'testing',
      createdAt: '2021-05-11T18:04:47.698Z',
      fileName: 'testFile.js',
      id: 2,
      line: 1,
      submissionId: 1
    })
  })
  test('should throw error if no user.id in context', async () => {
    try {
      await addComment(
        {},
        {
          line: 1,
          submissionId: 1,
          fileName: 'testFile.js',
          content: 'testing'
        },

        { req: {} }
      )
    } catch (e) {
      expect(e.message).toEqual('No authorId field')
    }
  })
})
