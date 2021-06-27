import { prisma } from '../../prisma'
import { getPreviousSubmissions } from './getPreviousSubmissions'

describe('getPreviousSubmissions test', () => {
  test('Should invoke prisma query', async () => {
    const query = (prisma.submission.findMany = jest.fn())
    await getPreviousSubmissions(
      {},
      {
        challengeId: 1,
        userId: 1
      },
      {}
    )
    expect(query).toBeCalled()
  })
})
