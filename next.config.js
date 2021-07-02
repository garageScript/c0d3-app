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
  target: 'experimental-serverless-trace'
})

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  debug: true,
  silent: false // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
