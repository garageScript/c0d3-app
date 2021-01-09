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

const prismJs = [
  'prismjs',
  {
    languages: ['javascript', 'css', 'html', 'jsx', 'json']
  }
]

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [inlineReactSvg, prismJs, '@babel/syntax-dynamic-import']
}
