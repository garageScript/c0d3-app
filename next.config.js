const { withSentryConfig } = require('@sentry/nextjs')
const CopyPlugin = require('copy-webpack-plugin')

const moduleExports = {
  webpack: function (config, { dev, isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    // copy files you're interested in
    if (!dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: 'content', to: 'content' }]
        })
      )
    }

    return config
  },
  async redirects() {
    return [
      {
        source: '/book',
        destination: '/docs/learn',
        permanent: true
      }
    ]
  },
  pageExtensions: ['tsx', 'js', 'jsx', 'mdx', 'ts'],
  images: {
    domains: ['cdn.discordapp.com']
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  sentry: {
    hideSourceMaps: true
  }
}

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
