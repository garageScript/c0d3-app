const webpack = require('webpack')
const withSass = require('@zeit/next-sass')

require('dotenv').config()

module.exports = withSass({
  webpack(config, options) {
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
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }]
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })

    return config
  }
})
