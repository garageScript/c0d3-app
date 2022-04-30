/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { getPreviousSubmissions } from './getPreviousSubmissions'

describe('getPreviousSubmissions test', () => {
  test('Should invoke prismaMock query with correct values', async () => {
    await getPreviousSubmissions(
      {},
      {
        challengeId: 1,
        userId: 1
      },
      {}
    )
    expect(prismaMock.submission.findMany).toBeCalledWith(
      expect.objectContaining({
        where: {
          challengeId: 1,
          user: {
            id: 1
          }
        }
      })
    )
  })
})
