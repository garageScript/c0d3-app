/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { lessons } from './lessons'

describe('Lessons resolver', () => {
  test('lessons should return an empty array', async () => {
    prismaMock.lesson.findMany.mockResolvedValue([])
    return expect(lessons()).resolves.toEqual([])
  })
})
