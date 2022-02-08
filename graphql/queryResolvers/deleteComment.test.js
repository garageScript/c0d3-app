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
          id: 2
        },

        { req: {} }
      )
    } catch (e) {
      expect(e.message).toEqual('No authorId field')
    }
  })

  test('should throw error if user.id not equal to the comment authorId', async () => {
    try {
      await deleteComment(
        {},
        {
          authorId: 2
        },

        { req: { user: { id: 1 } } }
      )
    } catch (e) {
      expect(e.message).toEqual('Comment is not by the user')
    }
  })
})
