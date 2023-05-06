const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader?modules=true', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  })
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    // tells webpack to detect the module type from the extension
    // instead of package.json?
    type: 'javascript/auto'
  })

  config.resolve.extensions.push('.ts', '.tsx')
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
