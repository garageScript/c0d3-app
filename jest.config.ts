import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
    '!graphql/(resolvers|typeDefs|schema).ts',
    '!graphql/queries/*.ts',
    '!**/*.config.{js,ts}'
  ],
  coveragePathIgnorePatterns: [
    'stories/',
    'graphql/index.tsx',
    '__tests__/utils/',
    'prisma/',
    'scripts/',
    '[...nextauth].ts'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: ['__tests__/utils/', 'node_modules/', '.next/'],
  transformIgnorePatterns: ['node_modules/']
}

export default config
