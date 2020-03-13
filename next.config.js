const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    SERVER_URL:
      process.env.NODE_ENV === 'production'
        ? process.env.SERVER_URL
        : 'https://song.c0d3.com'
  }
})
