const withSass = require('@zeit/next-sass')
require('dotenv').config()
module.exports = withSass({
  env: {
    SERVER_URL: process.env.SERVER_URL,
    URI: process.env.URI
  }
})
