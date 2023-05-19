const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = ({ config }) => {
  // config.module.rules.push({
  //   test: /\.scss$/,
  //   use: [
  //     {
  //       loader: 'style-loader'
  //     },
  //     {
  //       loader: 'css-loader'
  //     },
  //     {
  //       loader: 'resolve-url-loader',
  //       options: {
  //         debug: true
  //       }
  //     },
  //     {
  //       loader: 'sass-loader',
  //       options: {
  //         sourceMap: true
  //       }
  //     }
  //   ],
  //   include: path.resolve(__dirname, '../')
  // })

  config.module.rules.push({
    test: /\.html$/i,
    loader: 'html-loader'
  })

  // config.resolve.alias['fonts'] = path.join(__dirname, '../public/fonts')

  config.plugins.push(new NodePolyfillPlugin())

  // config.resolve.fallback = {
  //   net: false
  // }

  config.resolve.extensions.push('.ts', '.tsx', '.scss')
  //exclude backend dependancies
  config.externals = {
    'aws-sdk': 'aws-sdk',
    child_process: 'child_process',
    dns: 'dns',
    fs: 'fs',
    net: 'net',
    tls: 'tls',
    'pg-native': 'pg-native'
  }

  return config
}
