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
    await expect(
      deleteComment(
        {},
        {
          id: 2
        },

        { req: { user: { id: 1 } } }
      )
    ).resolves.toEqual({
      authorId: 1,
      id: 2
    })
  })

  test('should throw error if no user.id in context', async () => {
    await expect(
      deleteComment(
        {},
        {
          id: 2
        },

        { req: {} }
      )
    ).rejects.toThrow('No authorId field')
  })

  test('should throw error if user.id not equal to the comment authorId', async () => {
    await expect(
      deleteComment(
        {},
        {
          authorId: 2
        },

        { req: { user: { id: 1 } } }
      )
    ).rejects.toThrow('Comment is not by the user')
  })
})
