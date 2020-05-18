import submit from './submit'
import request from 'graphql-request'
import * as message from '../messages'
import { DEBUG_TOKEN } from '../constants'
import { POST_SUBMISSION } from '../graphql'
import { getDiffAgainstMaster } from '../util/git'
import { askForChallenges, askCredentials } from '../util/prompt'
import { getToken, saveToken, verifyToken } from '../util/credentials'

jest.mock('graphql-request')
jest.mock('../util/credentials.ts')
jest.mock('../util/prompt')
jest.mock('../util/git')

describe('c0d3 submit', () => {
  const lessons = [
    {
      id: '5',
      title: 'Foundations of JavaScript',
      challenges: [
        {
          id: '110',
          title: 'Is Sum > 10',
          order: 7
        }
      ]
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should submit without error', async () => {
    const args = { url: 'fakeURL', debug: false }
    verifyToken.mockResolvedValue({
      isTokenValid: true,
      cliToken: 'fakeCliToken'
    })
    getDiffAgainstMaster.mockResolvedValue('fakeDiff')
    request.mockResolvedValueOnce({ lessons }).mockResolvedValueOnce()
    askForChallenges.mockResolvedValue({
      lessonId: 'fakeLessonID',
      challengeId: 'fakeChallengeId'
    })
    expect(await submit(args)).toBe(undefined)
    expect(request).toHaveBeenCalledTimes(2)
  })

  test('Should throw error: FAIL_TO_GET_LESSONS', async () => {
    const args = { url: 'fakeURL', debug: false }
    verifyToken.mockResolvedValue({
      isTokenValid: true,
      cliToken: 'fakeCliToken'
    })
    getDiffAgainstMaster.mockResolvedValue('fakeDiff')
    request.mockRejectedValue(message.FAIL_TO_GET_LESSONS)
    expect(request).rejects.toEqual(message.FAIL_TO_GET_LESSONS)
    expect(await submit(args)).toBe(undefined)
  })

  test('Should cover line 59...', async () => {
    const args = { url: 'fakeURL', debug: false }
    verifyToken.mockResolvedValue({
      isTokenValid: true,
      cliToken: 'fakeCliToken'
    })
    request.mockResolvedValueOnce({ lessons })
    getDiffAgainstMaster.mockResolvedValue('fakeDiff')
    request.mockRejectedValue()
    expect(await submit(args)).toBe(undefined)
  })

  test('Should use debug token', async () => {
    const args = { url: 'fakeURL', debug: true }
    verifyToken.mockResolvedValue({
      isTokenValid: true,
      cliToken: 'fakeCliToken'
    })
    getDiffAgainstMaster.mockResolvedValue('fakeDiff')
    request.mockResolvedValueOnce({ lessons }).mockResolvedValueOnce()
    askForChallenges.mockResolvedValue({
      lessonId: 'fakeLessonID',
      challengeId: 'fakeChallengeId'
    })

    const params = [
      args.url,
      POST_SUBMISSION,
      {
        lessonId: 'fakeLessonID',
        challengeId: 'fakeChallengeId',
        cliToken: DEBUG_TOKEN,
        diff: 'fakeDiff'
      }
    ]

    expect(await submit(args)).toBe(undefined)
    expect(request).toHaveBeenCalledTimes(2)
    expect(request).toHaveBeenNthCalledWith(2, ...params)
  })

  test('Should create and save new cliToken', async () => {
    const args = { url: 'fakeURL', debug: false }
    verifyToken.mockResolvedValue({
      isTokenValid: false,
      cliToken: ''
    })
    askCredentials.mockResolvedValue({
      username: 'fakeUsername',
      password: 'fakePassword'
    })
    getToken.mockResolvedValue('newCliToken')
    saveToken.mockResolvedValue()
    getDiffAgainstMaster.mockResolvedValue('fakeDiff')
    request.mockResolvedValueOnce({ lessons }).mockResolvedValueOnce()
    askForChallenges.mockResolvedValue({
      lessonId: 'fakeLessonID',
      challengeId: 'fakeChallengeId'
    })
    expect(await submit(args)).toBe(undefined)
    expect(request).toHaveBeenCalledTimes(2)
  })
})
