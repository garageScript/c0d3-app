module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource'
  ],
  // TODO remove this after react-docgen-typescript is fixed
  // related issue: https://github.com/styleguidist/react-docgen-typescript/issues/356
  typescript: {
    reactDocgen: 'none',
  }
}
