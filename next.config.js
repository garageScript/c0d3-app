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
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const moduleExports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ['tsx', 'js', 'jsx', 'mdx', 'ts']
  })
)

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  // Force dry run when no sentry environnement variable is set or in dev mode.
  // This allows developers to make production builds locally without needing
  // to setting up all the other sentry environment variables
  dryRun:
    process.env.NODE_ENV === 'development' ||
    !process.env.NEXT_PUBLIC_SENTRY_DSN,

  // This plugin is used to send source map files to sentry.io during build time.
  // Silencing the log hides all the information about each individual file being
  // sent keeping the build logs cleaner and still logging any error that occurs.
  silent: true
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
