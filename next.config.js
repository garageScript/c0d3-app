const slug = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [slug, [toc, { maxDepth: 2 }], gfm]
  }
})
module.exports = withMDX({
  pageExtensions: ['tsx', 'js', 'jsx', 'mdx', 'ts'],
  env: {
    DB_NAME: process.env.DB_NAME || 'c0d3dev6',
    DB_USER: process.env.DB_USER || 'c0d3db',
    DB_PW: process.env.DB_PW || 'letmein2',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_HOST: process.env.DB_HOST || 'freedomains.dev',
    SENTRY_DSN:
      process.env.SENTRY_DSN ||
      'https://e95626afb0454145b569bc69116f838c@o385150.ingest.sentry.io/5221680',
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET || 'c0d3hard3r',
    SERVER_URL: process.env.SERVER_URL || '/api/graphql'
  }
})
