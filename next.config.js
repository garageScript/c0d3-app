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
