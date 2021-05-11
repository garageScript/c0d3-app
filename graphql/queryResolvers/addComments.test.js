import { prisma } from '../../prisma'
import { addComment } from './addComment'

//should be added to coverageIngorePatters
describe('Add comment resolver', () => {
  test('should invoke prisma create', async () => {
    prisma.comment.create = jest.fn().mockReturnValue({
      authorId: 1,
      content: 'testing',
      createdAt: '2021-05-11T18:04:47.698Z',
      fileName: 'testFile.js',
      id: 2,
      line: 1,
      submissionId: 1
    })
    expect(
      await addComment(
        {},
        {
          line: 1,
          submissionId: 1,
          authorId: 1,
          fileName: 'testFile.js',
          content: 'testing'
        },
        {}
      )
    ).toEqual({
      authorId: 1,
      content: 'testing',
      createdAt: '2021-05-11T18:04:47.698Z',
      fileName: 'testFile.js',
      id: 2,
      line: 1,
      submissionId: 1
    })
  })
})
