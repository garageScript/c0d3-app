module.exports = {
  semi: false,
  singleQuote: true,
  parser: 'typescript',
  trailingComma: 'none',
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    }
  ]
}
