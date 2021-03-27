import { prisma } from '../../prisma'
import { lessons } from './lessons'

describe('Lessons resolver', () => {
  test('lessons should return an empty array', async () => {
    prisma.lesson.findMany = jest.fn().mockReturnValue([])
    expect(lessons()).toEqual([])
  })
})
