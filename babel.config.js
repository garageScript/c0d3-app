const inlineReactSvg = [
  'inline-react-svg',
  {
    svgo: {
      plugins: [{
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
  plugins: [ inlineReactSvg, '@babel/syntax-dynamic-import']
}
