jest.mock('../dbload')
jest.mock('../mattermost')
import db from '../dbload'
import { createChallenge, updateChallenge } from './challengesController'

const { Challenge } = db

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
      user: { isAdmin: 'true' }
    }
  }

  Challenge.build = jest.fn().mockReturnValue({ save: () => {} })

  test('Should create new challenge', async () => {
    expect(createChallenge(null, mockChallengeData, ctx)).resolves.toEqual({
      success: true
    })
  })

  test('Should update challenge', async () => {
    expect(updateChallenge(null, mockChallengeData, ctx)).resolves.toEqual({
      success: true
    })
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
