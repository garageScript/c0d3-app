import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'

export interface ResWithCookie extends NextApiResponse {
  cookie: Function
}

/**
 * This sets `cookie` on `res` object
 */
const cookie = (
  res: NextApiResponse,
  name: string,
  value: string | object,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler: Function) => (
  req: NextApiRequest,
  res: ResWithCookie
) => {
  res.cookie = (name: string, value: string, options: CookieSerializeOptions) =>
    cookie(res, name, value, options)

  return handler(req, res)
}

export default cookies
