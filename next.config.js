const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    CHAT_URL: process.env.CHAT_URL || 'https://mattermost.devwong.com/api/v4',
    DB_NAME: process.env.DB_NAME || 'c0d3dev',
    DB_USER: process.env.DB_USER || 'herman',
    DB_PW: process.env.DB_PW || 'letmein2',
    DB_HOST: process.env.DB_HOST || 'devwong.com',
    MATTERMOST_ACCESS_TOKEN:
      process.env.MATTERMOST_ACCESS_TOKEN || 'c1eh9rc1cinpbf9mk1wucjyqzw',
    SENTRY_DSN:
      process.env.SENTRY_DSN ||
      'https://e95626afb0454145b569bc69116f838c@o385150.ingest.sentry.io/5221680',
    SESSION_SECRET: process.env.SESSION_SECRET || 'c0d3hard3r',
    SERVER_URL: process.env.SERVER_URL || '/api/graphql'
  }
})
