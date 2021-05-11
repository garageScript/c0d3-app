import { prisma } from '../../prisma'
import { getComments } from './getComments'

//should be added to coverageIngorePatters
describe('getComments resolver', () => {
  test('Should invoke prisma findMany', async () => {
    prisma.comment.findMany = jest.fn().mockReturnValue(['many comments'])
    expect(
      await getComments({}, { submissionId: 0, fileName: 'testFile.js' }, {})
    ).toEqual(['many comments'])
  })
})
