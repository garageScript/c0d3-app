import { LoggedRequest } from '../@types/helpers'

export const isSignedIn = (req: LoggedRequest): boolean => {
  return req.user?.id ? true : false
}

export const isSignedInOrThrow = (req: LoggedRequest): void => {
  if (!isSignedIn(req)) throw new Error('No user signed in')
}

export const getUserId = (req: LoggedRequest): number => {
  return req.user?.id ? req.user.id : -1
}

export const getUserIdOrThrow = (req: LoggedRequest): void | number => {
  if (!isSignedIn(req)) throw new Error('No user signed in')
  return req.user?.id
}
