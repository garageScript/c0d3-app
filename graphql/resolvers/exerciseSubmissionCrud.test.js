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

  test("Should return user's exercise submissions of the logged in user", () => {
    const mockExerciseSubmissions = [{ id: 1 }, { id: 2 }]
    const mockContext = { req: { user: { id: 1 } } }
    prismaMock.exerciseSubmission.findMany.mockResolvedValue(
      mockExerciseSubmissions
    )

    expect(
      exerciseSubmissions(undefined, undefined, mockContext)
    ).resolves.toEqual(mockExerciseSubmissions)
  })
})

describe('addExerciseSubmission resolver', () => {
  test("Should throw an error if the user isn't logged in", () => {
    const mockContext = { req: { user: null } }
    const mockArgs = { exerciseId: 2, userAnswer: '123' }

    expect(
      addExerciseSubmission(undefined, mockArgs, mockContext)
    ).rejects.toEqual(new Error('User should be logged in.'))
  })

  test('Should update an exercise submission if it already exists', () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = { exerciseId: 2, userAnswer: '123' }
    const mockExerciseSubmission = {
      id: 1,
      exercise: { id: 2 },
      user: { id: 1 },
      userAnswer: '123'
    }
    prismaMock.exerciseSubmission.findFirst.mockResolvedValue(
      mockExerciseSubmission
    )
    prismaMock.exerciseSubmission.update.mockResolvedValue(
      mockExerciseSubmission
    )

    expect(
      addExerciseSubmission(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseSubmission)
  })

  test("Should create a new exercise submission if one doesn't already exist", () => {
    const mockContext = { req: { user: { id: 1 } } }
    const mockArgs = { exerciseId: 2, userAnswer: '123' }
    const mockExerciseSubmission = {
      id: 1,
      exercise: { id: 2 },
      user: { id: 1 },
      userAnswer: '123'
    }
    prismaMock.exerciseSubmission.findFirst.mockResolvedValue(null)
    prismaMock.exerciseSubmission.create.mockResolvedValue(
      mockExerciseSubmission
    )

    expect(
      addExerciseSubmission(undefined, mockArgs, mockContext)
    ).resolves.toEqual(mockExerciseSubmission)
  })
})
