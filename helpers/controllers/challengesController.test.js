jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('../lessonExists')
jest.mock('../../graphql/queryResolvers/lessons')
import db from '../dbload'
import { createChallenge, updateChallenge } from './challengesController'
import { lessonExists } from '../lessonExists'
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

Lesson.findAll = jest.fn().mockReturnValue(lessonData)

describe('Challenges controller tests', () => {
  beforeEach(() => {
    lessonExists.mockReturnValue(true)
  })
  const ctx = {
    req: {
      user: { isAdmin: 'true' }
    }
  }

  Challenge.build = jest.fn().mockReturnValue({ save: () => {} })

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

  test('Should throw "lessonId does not exist" error if lessonId does not exist \
   in database when creating challenge', async () => {
    lessonExists.mockReturnValue(false)
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('lessonId does not exist in database')
  })

  test('Should throw "lessonId does not exist" error if lessonId does not exist \
  in database when updating challenge', async () => {
    lessonExists.mockReturnValue(false)
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('lessonId does not exist in database')
  })

  test('Should throw Error "User is not admin" error if user is not an admin \
  when updating challenge', async () => {
    ctx.req.user.isAdmin = 'false'
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('User is not an admin')
  })

  test('Should throw "User is not an admin" error if user is not an admin when \
  creating challenge', async () => {
    ctx.req.user.isAdmin = 'false'
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('User is not an admin')
  })
})
