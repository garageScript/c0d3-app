import { resolveRequestDocument } from 'graphql-request'
import prismaMock from '../../__tests__/utils/prismaMock'
import { editComment } from './editComment'

const mockEditComment = {
  id: 2,
  content: 'i edited this comment'
}

describe('Edit comments resolver', () => {
  test('should invoke prismaMock update', async () => {
    prismaMock.comment.update.mockResolvedValue({
      id: 2,
      authorId: 1
    })
    prismaMock.comment.findUnique.mockResolvedValue({
      authorId: 1
    })
    await expect(
      editComment({}, mockEditComment, { req: { user: { id: 1 } } })
    ).resolves.toEqual({
      authorId: 1,
      id: 2
    })
  })

  test('should throw error if no user.id in context', async () => {
    await expect(editComment({}, mockEditComment, { req: {} })).rejects.toThrow(
      'No user'
    )
  })

  test('should throw error if user.id does not match author.id', async () => {
    await expect(
      editComment(
        {},
        {
          authorId: 2
        },
        { req: { user: { id: 1 } } }
      )
    ).rejects.toThrow('Comment is not by the user')
  })
})
