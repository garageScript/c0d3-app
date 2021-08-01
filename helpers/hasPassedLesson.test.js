/**
 * @jest-environment node
 */

const { prisma } = require('../prisma')
const { hasPassedLesson } = require('./hasPassedLesson')

describe('hasPassedLesson helper function', () => {
  test('should return true when user has passed the lesson', async () => {
    prisma.userLesson.findUnique = jest.fn().mockReturnValue({
      passedAt: new Date()
    })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(true)
  })
  test('should return false when user has not passed the lesson', async () => {
    prisma.userLesson.findUnique = jest.fn().mockReturnValue({ passedAt: null })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
  test('should return false when userLesson is null', async () => {
    prisma.userLesson.findUnique = jest.fn().mockReturnValue(null)
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
})
