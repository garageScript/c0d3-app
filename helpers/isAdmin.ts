import { LoggedRequest } from '../@types/helpers'

export const isAdmin = (req: LoggedRequest): boolean => {
  return (req.user && req.user.isAdmin) || false
}
