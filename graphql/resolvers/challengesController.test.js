/**
 * @jest-environment node
 */

jest.mock('../../helpers/validation/validateLessonId')
jest.mock('./lessons')
import { lessons } from './lessons'
import lessonData from '../../__dummy__/lessonData'
import prismaMock from '../../__tests__/utils/prismaMock'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import { createChallenge, updateChallenge } from './challengesController'

lessons.mockReturnValue(lessonData)

const mockChallengeData = {
  lessonId: 5,
  id: 102,
  order: 19,
  description: 'lolz',
  title: 'potato'
}

describe('Challenges controller tests', () => {
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    validateLessonId.mockResolvedValue(true)
  })

  test('Should create new challenge', async () => {
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).resolves.toEqual(lessonData)
    expect(prismaMock.challenge.create).toBeCalledWith({
      data: mockChallengeData
    })
  })

  test('Should update challenge', async () => {
    const { id, lessonId, ...data } = mockChallengeData
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).resolves.toEqual(lessonData)
    expect(prismaMock.challenge.update).toBeCalledWith({ where: { id }, data })
  })

  test('Should throw error if lessonId does not exist \
   in database when creating challenge', async () => {
    validateLessonId.mockRejectedValueOnce(new Error())
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError()
    expect(prismaMock.challenge.create).not.toBeCalled()
  })

  test('Should throw error if lessonId does not exist \
  in database when updating challenge', async () => {
    validateLessonId.mockRejectedValueOnce(new Error())
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError()
    expect(prismaMock.challenge.update).not.toBeCalled()
  })
})
