/**
 * @jest-environment node
 */

jest.mock('../validateLessonId')
jest.mock('../../graphql/queryResolvers/lessons')
import { createChallenge, updateChallenge } from './challengesController'
import { validateLessonId } from '../validateLessonId'
import lessonData from '../../__dummy__/lessonData'
import { lessons } from '../../graphql/queryResolvers/lessons'
import { prisma } from '../../prisma'

lessons.mockReturnValue(lessonData)
prisma.challenge.create = jest.fn()
prisma.challenge.update = jest.fn()

const mockChallengeData = {
  lessonId: 5,
  id: 102,
  order: 19,
  description: 'lolz',
  title: 'potato'
}

describe('Challenges controller tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    validateLessonId.mockResolvedValue(true)
  })
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  test('Should create new challenge', async () => {
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).resolves.toEqual(lessonData)
    expect(prisma.challenge.create).toBeCalledWith({ data: mockChallengeData })
  })

  test('Should update challenge', async () => {
    const { id, lessonId, ...data } = mockChallengeData
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).resolves.toEqual(lessonData)
    expect(prisma.challenge.update).toBeCalledWith({ where: { id }, data })
  })

  test('Should throw error if lessonId does not exist \
   in database when creating challenge', async () => {
    validateLessonId.mockRejectedValueOnce(new Error())
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError()
    expect(prisma.challenge.create).not.toBeCalled()
  })

  test('Should throw error if lessonId does not exist \
  in database when updating challenge', async () => {
    validateLessonId.mockRejectedValueOnce(new Error())
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError()
    expect(prisma.challenge.update).not.toBeCalled()
  })

  test('Should throw "User is not admin" error if user is not an admin \
  when updating challenge', async () => {
    ctx.req.user.isAdmin = false
    await expect(
      updateChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('User is not an admin')
    expect(prisma.challenge.create).not.toBeCalled()
  })

  test('Should throw "User is not an admin" error if user is not an admin when \
  creating challenge', async () => {
    ctx.req.user.isAdmin = false
    await expect(
      createChallenge(null, mockChallengeData, ctx)
    ).rejects.toThrowError('User is not an admin')
    expect(prisma.challenge.update).not.toBeCalled()
  })
})
