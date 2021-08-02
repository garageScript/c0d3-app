import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  maxConcurrency: 1,
  testEnvironment: 'node',
  testRegex: '/__tests__/integration/.*\\.test\\.[jt]s$'
}

export default config
