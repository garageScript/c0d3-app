import { LoggedRequest } from '../@types/helpers'

export const isAdmin = (req: LoggedRequest): boolean => {
  return req.user?.isAdmin ?? false
}

export const isAdminOrThrow = (req: LoggedRequest): void => {
  if (!isAdmin(req)) throw new Error('User is not an admin')
}
