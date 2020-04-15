const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    DB_NAME: process.env.DB_NAME || 'c0d3dev',
    DB_USER: process.env.DB_USER || 'herman',
    DB_PW: process.env.DB_PW || 'letmein2',
    DB_HOST: process.env.DB_HOST || 'devwong.com',
    SERVER_URL: process.env.SERVER_URL || 'https://backend.c0d3.com'
  }
})
