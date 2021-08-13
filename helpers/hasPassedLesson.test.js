/**
 * @jest-environment node
 */

import prismaMock from '../__tests__/utils/prismaMock'
import { hasPassedLesson } from './hasPassedLesson'

describe('hasPassedLesson helper function', () => {
  test('should return true when user has passed the lesson', async () => {
    prismaMock.userLesson.findFirst.mockResolvedValue({
      isPassed: '1596128754889'
    })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(true)
  })
  test('should return false when user has not passed the lesson', async () => {
    prismaMock.userLesson.findFirst.mockResolvedValue({ isPassed: null })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
  test('should return false when userLesson is null', async () => {
    prismaMock.userLesson.findFirst.mockResolvedValue(null)
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
})
