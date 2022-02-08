/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { deleteComment } from './deleteComment'

describe('Delete comment resolver', () => {
  test('should invoke prismaMock delete', async () => {
    prismaMock.comment.delete.mockResolvedValue({
      id: 2,
      authorId: 1
    })
    prismaMock.comment.findUnique.mockResolvedValue({
      authorId: 1
    })
    expect(
      await deleteComment(
        {},
        {
          id: 2
        },

        { req: { user: { id: 1 } } }
      )
    ).toEqual({
      authorId: 1,
      id: 2
    })
  })

  test('should throw error if no user.id in context', async () => {
    try {
      await deleteComment(
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
