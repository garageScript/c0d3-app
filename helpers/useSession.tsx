import { User } from './models/User'


export const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

export type SessionData = {
  data: {
    userInfo?: User
    errorMessage?: string
    success: boolean
  }
  error?: boolean
}

const useSession = (): SessionData => {
  const data = {
    errorMessage: 'test',
    success: true
  }
  return { data }
}

export default useSession
