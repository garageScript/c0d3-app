const { withSentryConfig } = require('@sentry/nextjs')
const slug = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [slug, [toc, { maxDepth: 2 }], gfm]
  }
})
const moduleExports = withMDX({
  pageExtensions: ['tsx', 'js', 'jsx', 'mdx', 'ts'],
  env: {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PW: process.env.DB_PW,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    SENTRY_DSN: process.env.SENTRY_DSN,
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SERVER_URL: process.env.SERVER_URL
  }
})

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
