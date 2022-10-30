import prismaMock from '../../__tests__/utils/prismaMock'
import { addExerciseComment } from './exerciseCommentCrud'

describe('addExerciseComment resolver tests', () => {
  test('Should throw error if user is invalid or not loggedin', async () => {
    const mockContext = { req: { user: null } }
    const mockArgs = {
      exerciseId: 1,
      content: 'no user',
      parentId: 1,
      userPic: undefined
    }

    await expect(
      addExerciseComment(undefined, mockArgs, mockContext)
    ).rejects.toEqual(new Error('User should be logged in'))
  })

  test('Should create a new exerciseComment in prisma', async () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = {
      exerciseId: 1,
      content: 'there is user',
      parentId: null,
      userPic: null
    }
    const mockExerciseComment = {
      id: 1,
      exerciseId: 1,
      authorId: 1,
      content: 'there is user',
      userPic: null
    }

    prismaMock.exerciseComment.create.mockResolvedValue(mockExerciseComment)
    await expect(
      addExerciseComment(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseComment)

    expect(prismaMock.exerciseComment.create).toBeCalledWith({
      data: {
        authorId: 1,
        content: 'there is user',
        exerciseId: 1,
        parentId: null,
        userPic: null
      }
    })
  })
})
