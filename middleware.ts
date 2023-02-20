import { SETTINGS_ACCOUNT_PATH } from './constants'

export { default } from 'next-auth/middleware'

export const config = { matcher: [SETTINGS_ACCOUNT_PATH] }
