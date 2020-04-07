const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    SERVER_URL: process.env.SERVER_URL || 'https://backend.c0d3.com'
  }
})
