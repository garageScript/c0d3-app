const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    SERVER_URL:
      process.env.NODE_ENV === 'production'
        ? process.env.SERVER_URL
        : 'https://c0d3-back.a0d3.com'
  }
})
