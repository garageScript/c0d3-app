const webpack = require('webpack')
const withSass = require('@zeit/next-sass')

require('dotenv').config()

module.exports = withSass({
  webpack(config) {
    if (process.env.NODE_ENV !== 'production') {
      config.node = {
        fs: 'empty'
      }

      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
        return acc
      }, {})

      config.plugins.push(new webpack.DefinePlugin(env))
    }
    return config
  }
})
