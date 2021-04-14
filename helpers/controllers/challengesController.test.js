jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('../validateLessonId')
jest.mock('../../graphql/queryResolvers/lessons')
import db from '../dbload'
import { createChallenge, updateChallenge } from './challengesController'
import { validateLessonId } from '../validateLessonId'
import lessonData from '../../__dummy__/lessonData'
import { lessons } from '../../graphql/queryResolvers/lessons'

lessons.mockReturnValue(lessonData)
const { Challenge, Lesson } = db

const mockChallengeData = {
  lessonId: 5,
  id: 102,
  order: 19,
  description: 'lolz',
  title: 'potato'
}

Lesson.findAll.mockReturnValue(lessonData)

describe('Challenges controller tests', () => {
  beforeEach(() => {
    validateLessonId.mockReturnValue(true)
  })
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  Challenge.build.mockReturnValue({ save: () => {} })

  test('Should create new challenge', async () => {
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).resolves.toEqual(lessonData)
  })

  test('Should update challenge', async () => {
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).resolves.toEqual(lessonData)
  })

  test('Should throw error if lessonId does not exist \
   in database when creating challenge', async () => {
    validateLessonId.mockImplementation(() => {
      throw new Error()
    })
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError()
  })

  test('Should throw error if lessonId does not exist \
  in database when updating challenge', async () => {
    validateLessonId.mockImplementation(() => {
      throw new Error()
    })
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError()
  })

  test('Should throw "User is not admin" error if user is not an admin \
  when updating challenge', async () => {
    ctx.req.user.isAdmin = false
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('User is not an admin')
  })

  test('Should throw "User is not an admin" error if user is not an admin when \
  creating challenge', async () => {
    ctx.req.user.isAdmin = false
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('User is not an admin')
  })
})
