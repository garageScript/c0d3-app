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
    'pages/*' //THIS IS ONLY A TESTING/DEBUGING BUILD AND SHOULD NEVER HIT PRODUCTION
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
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['__tests__/utils/', 'node_modules/', '.next/'],
  transformIgnorePatterns: ['node_modules/']
}

export default config
