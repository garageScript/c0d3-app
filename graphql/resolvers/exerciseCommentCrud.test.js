import prismaMock from '../../__tests__/utils/prismaMock'
import {
  addExerciseComment,
  getExerciseComments,
  getChildComments
} from './exerciseCommentCrud'

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

describe('getExerciseComment resolver test', () => {
  test('should return exerciseComment with id 1', async () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = { exerciseId: 1 }
    const mockExerciseComments = [
      {
        id: 1,
        exerciseId: 1,
        authorId: 1,
        content: 'there is user',
        userPic: null
      },
      {
        id: 2,
        exerciseId: 1,
        authorId: 2,
        content: 'there is user 2',
        userPic: null
      }
    ]

    prismaMock.exerciseComment.findMany.mockResolvedValue(mockExerciseComments)
    await expect(
      getExerciseComments(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseComments)

    expect(prismaMock.exerciseComment.findMany).toBeCalledWith({
      where: { parentId: null, exerciseId: 1 },
      include: {
        replies: true,
        author: true
      }
    })
  })
})

describe('getChildComments resolver tests', () => {
  test('should return all comments with parent id 1', async () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = { parentId: 1 }
    const mockExerciseComments = [
      {
        id: 2,
        exerciseId: 1,
        authorId: 1,
        parentId: 1,
        content: 'there is user',
        userPic: null
      },
      {
        id: 3,
        exerciseId: 1,
        authorId: 2,
        parentId: 1,
        content: 'there is user 2',
        userPic: null
      }
    ]

    prismaMock.exerciseComment.findMany.mockResolvedValue(mockExerciseComments)
    await expect(
      getChildComments(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseComments)

    expect(prismaMock.exerciseComment.findMany).toBeCalledWith({
      where: { parentId: 1 },
      include: {
        replies: true,
        author: true
      }
    })
  })
})
