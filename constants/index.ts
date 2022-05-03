// File for all project constant

export const PROFILE_PATH = '/profile'
export const CURRICULUM_PATH = '/curriculum'
export const REVIEW_PATH = '/review'
export const REPO_PATH = 'https://github.com/garageScript/c0d3-app'
export const ADMIN_PATH = '/admin'
export const DOCS_PATH = '/docs'
export const DISCORD_PATH = 'https://discord.gg/c0d3'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'

// URL Constants
export const DEPLOYMENT_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT ?? 3000}`

export const CURRICULUM_URL = `${DEPLOYMENT_URL}${CURRICULUM_PATH}`
export const REVIEW_URL = `${DEPLOYMENT_URL}${REVIEW_PATH}`
export const PROFILE_URL = `${DEPLOYMENT_URL}${PROFILE_PATH}`
export const ASSETS_URL = 'https://www.c0d3.com/assets'

// `${DEPLOYMENT_URL}/assets`
export const getLessonCoverPNG = (order: number) =>
  `${ASSETS_URL}/curriculum/thumbnails/js-${order}-cover.png`

export const C0D3_ICON_URL = `${ASSETS_URL}/icon.png`
