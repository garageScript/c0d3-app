jest.mock('../dbload')
jest.mock('../mattermost')
import db from '../dbload'
import { createChallenge, updateChallenge } from './challengesController'
import lessonData from '../../__dummy__/lessonData'
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
  const ctx = {
    req: {
      user: { isAdmin: 'true' }
    }
  }

  Challenge.build = jest.fn().mockReturnValue({ save: () => {} })

  test('Should create new challenge', async () => {
    expect(createChallenge(null, mockChallengeData, ctx)).resolves.toEqual(
      lessonData
    )
  })

  test('Should update challenge', async () => {
    expect(updateChallenge(null, mockChallengeData, ctx)).resolves.toEqual(
      lessonData
    )
  })

  test('Should throw Error when user is not an admin when updating challenge', async () => {
    ctx.req.user.isAdmin = 'false'
    expect(updateChallenge(null, mockChallengeData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })

  test('Should throw Error when user is not an admin when creating challenge', async () => {
    ctx.req.user.isAdmin = 'false'
    expect(createChallenge(null, mockChallengeData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })
})
