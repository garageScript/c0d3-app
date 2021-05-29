const prismJs = [
  'prismjs',
  {
    languages: ['javascript', 'css', 'html', 'jsx', 'json']
  }
]

module.exports = {
  presets: ['next/babel'],
  plugins: [prismJs]
}
