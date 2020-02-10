module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    'inline-react-svg',
    '@babel/syntax-dynamic-import',
    'require-context-hook'
  ]
}
