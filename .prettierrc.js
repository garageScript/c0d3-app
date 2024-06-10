module.exports = {
  semi: false,
  singleQuote: true,
  parser: 'typescript',
  trailingComma: 'none',
  arrowParens: 'avoid',
  proseWrap: 'always',
  endOfLine: "auto",
  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    },
    {
      files: '*.json',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx'
      }
    }
  ]
}
