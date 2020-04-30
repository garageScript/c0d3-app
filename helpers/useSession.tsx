import useSWR from 'swr'
import { User } from './models/User'

//const SERVER_URL = process.env.SERVER_URL

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
  const { data, error } = useSWR(`/api/graphql`, fetcher)
  return { data, error }
}

export default useSession
