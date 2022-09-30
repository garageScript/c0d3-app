/**
 * @jest-environment node
 */
import prismaMock from '../../__tests__/utils/prismaMock'
import {
  exerciseSubmissions,
  addExerciseSubmission
} from './exerciseSubmissionCrud'

describe('exerciseSubmissions resolver', () => {
  test('Should return an empty array if the user is not logged in', () => {
    const mockContext = { req: { user: null } }

    expect(exerciseSubmissions(undefined, undefined, mockContext)).toEqual([])
  })

  test("Should return user's exercise submissions of the logged in user", async () => {
    const mockExerciseSubmissions = [{ id: 1 }, { id: 2 }]
    const mockContext = { req: { user: { id: 1 } } }
    prismaMock.exerciseSubmission.findMany.mockResolvedValue(
      mockExerciseSubmissions
    )

    await expect(
      exerciseSubmissions(undefined, undefined, mockContext)
    ).resolves.toEqual(mockExerciseSubmissions)
    expect(prismaMock.exerciseSubmission.findMany).toBeCalledWith({
      where: { userId: 1 }
    })
  })
})

describe('addExerciseSubmission resolver', () => {
  test("Should throw an error if the user isn't logged in", async () => {
    const mockContext = { req: { user: null } }
    const mockArgs = { exerciseId: 2, userAnswer: '123' }

    await expect(
      addExerciseSubmission(undefined, mockArgs, mockContext)
    ).rejects.toEqual(new Error('User should be logged in.'))
  })

  test('Should update an exercise submission if it already exists', async () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = { exerciseId: 2, userAnswer: '123' }
    const mockExerciseSubmission = {
      id: 1,
      exerciseId: 2,
      userId: 1,
      userAnswer: '123'
    }
    prismaMock.exerciseSubmission.findFirst.mockResolvedValue(
      mockExerciseSubmission
    )
    prismaMock.exerciseSubmission.update.mockResolvedValue(
      mockExerciseSubmission
    )

    await expect(
      addExerciseSubmission(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseSubmission)
    expect(prismaMock.exerciseSubmission.findFirst).toBeCalledWith({
      where: { exerciseId: 2, userId: 1 }
    })
    expect(prismaMock.exerciseSubmission.update).toBeCalledWith({
      data: { exerciseId: 2, userAnswer: '123', userId: 1 },
      where: { id: 1 }
    })
  })

  test("Should create a new exercise submission if one doesn't already exist", async () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = { exerciseId: 2, userAnswer: '123' }
    const mockExerciseSubmission = {
      id: 1,
      exerciseId: 2,
      userId: 1,
      userAnswer: '123'
    }
    prismaMock.exerciseSubmission.findFirst.mockResolvedValue(null)
    prismaMock.exerciseSubmission.create.mockResolvedValue(
      mockExerciseSubmission
    )

    await expect(
      addExerciseSubmission(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseSubmission)
    expect(prismaMock.exerciseSubmission.findFirst).toBeCalledWith({
      where: { exerciseId: 2, userId: 1 }
    })
    expect(prismaMock.exerciseSubmission.create).toBeCalledWith({
      data: { exerciseId: 2, userAnswer: '123', userId: 1 }
    })
  })
})
