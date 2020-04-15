const inlineReactSvg = [
  // We are disabling svg optimization because it breaks tests.
  // Issue: https://github.com/garageScript/c0d3-app/issues/104
  'inline-react-svg',
  {
    svgo: {
      plugins: [
        {
          removeAttrs: { attrs: '(data-name)' }
        },
        {
          cleanupIDs: true
        }
      ]
    }
  }
]

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [inlineReactSvg, '@babel/syntax-dynamic-import']
}
