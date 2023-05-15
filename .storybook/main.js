// module.exports = {
//   stories: [
//     // '../stories/**/*.stories.tsx'
//     // '../stories/pages/Contributors.stories.tsx'
//     '../stories/pages/Curriculum.stories.tsx'
//     // '../stories/pages/ForgotPassword.stories.tsx',
//     // '../stories/pages/Landing.stories.tsx',
//     // '../stories/pages/Lesson.stories.tsx',
//     // '../stories/pages/Login.stories.tsx',
//     // '../stories/pages/ResetPassword.stories.tsx',
//     // '../stories/pages/Signup.stories.tsx'
//   ],
//   addons: [
//     // '@storybook/addon-essentials',
//     // '@storybook/addon-actions',
//     // '@storybook/addon-viewport',
//     // '@storybook/addon-storysource',
//     '@storybook/addon-mdx-gfm'
//   ],
//   framework: {
//     name: '@storybook/nextjs',
//     options: {}
//   },
//   docs: {
//     autodocs: true
//   },
//   staticDirs: ['../public']
// }

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ["../stories/pages/*.stories.tsx"],
  // addons: [
  //   "@storybook/addon-links",
  //   "@storybook/addon-essentials",
  //   "@storybook/addon-interactions",
  // ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ['../public']
};
export default config;
