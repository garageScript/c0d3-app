module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  env: {
    test: {
      plugins: ['require-context-hook']
    }
  },
  plugins: ['inline-react-svg', '@babel/syntax-dynamic-import']
}
