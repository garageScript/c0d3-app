/**
 * @jest-environment node
 */

import prismaMock from '../__tests__/utils/prismaMock'
import { hasPassedLesson } from './hasPassedLesson'

describe('hasPassedLesson helper function', () => {
  test('should return true when user has passed the lesson', async () => {
    prismaMock.userLesson.findUnique.mockResolvedValue({
      passedAt: new Date()
    })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(true)
  })
  test('should return false when user has not passed the lesson', async () => {
    prismaMock.userLesson.findUnique.mockResolvedValue({ passedAt: null })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
  test('should return false when userLesson is null', async () => {
    prismaMock.userLesson.findUnique.mockResolvedValue(null)
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
})
