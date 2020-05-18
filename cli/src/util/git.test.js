import { getDiffAgainstMaster } from './git'
import * as message from '../messages'

jest.mock('simple-git/promise', () =>
  jest.fn(() => {
    return {
      branch: jest
        .fn()
        .mockResolvedValueOnce({ current: 'notMaster' })
        .mockResolvedValueOnce({ current: 'master' })
        .mockResolvedValueOnce({ current: 'notMaster' }),
      diff: jest
        .fn()
        .mockResolvedValueOnce('fakeDiff')
        .mockResolvedValueOnce('')
    }
  })
)

describe('getDiffAgainstMaster', () => {
  test('Should return diff', () => {
    expect(getDiffAgainstMaster()).resolves.toBe('fakeDiff')
  })

  test('Should throw error: WRONG_BRANCH', () => {
    expect(getDiffAgainstMaster()).rejects.toThrow(message.WRONG_BRANCH)
  })

  test('Should throw error: NO_DIFFERENCE', () => {
    expect(getDiffAgainstMaster()).rejects.toThrow(message.NO_DIFFERENCE)
  })
})
