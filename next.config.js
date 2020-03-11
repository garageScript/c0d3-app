const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    SERVER_URL: 'https://c0d3.com/signin'
  }
})
