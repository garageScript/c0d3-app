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
  plugins: [prismJs, '@babel/syntax-dynamic-import']
}
