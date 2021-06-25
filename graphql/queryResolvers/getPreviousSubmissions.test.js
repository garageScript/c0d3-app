import { prisma } from '../../prisma'
import { getPreviousSubmissions } from './getPreviousSubmissions'

describe('getPreviousSubmissions test', () => {
  test('Should await prisma query', async () => {
    prisma.submission.findMany = jest.fn().mockResolvedValue([
      {
        title: 'testSubmissionA'
      },
      { title: 'testSubmissionB' }
    ])
    expect(
      await getPreviousSubmissions(
        {},
        {
          lessonId: 1,
          challengeId: 1,
          userId: 1
        },

        { req: { user: { id: 1 } } }
      )
    ).toEqual([
      {
        title: 'testSubmissionA'
      },
      { title: 'testSubmissionB' }
    ])
  })
})
