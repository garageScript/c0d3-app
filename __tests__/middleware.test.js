jest.mock('next-auth/middleware', () => ({}))

import { config } from '../middleware'
import { SETTINGS_ACCOUNT_PATH } from '../constants/index.ts'

describe('Main Middleware', () => {
  test('expect config to match correct paths', () => {
    expect(config.matcher).toStrictEqual([SETTINGS_ACCOUNT_PATH])
  })
})
