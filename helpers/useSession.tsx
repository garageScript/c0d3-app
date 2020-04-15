import useSWR from 'swr'

const SERVER_URL = process.env.SERVER_URL

export const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

type SessionData = {
  data: {
    userInfo: {
      id: number
      name: string
      username: string
      createdAt: string
      isAdmin: boolean
      emailVerificationToken: string
    }
    errorMessage?: string
    success: boolean
  }
  error: boolean
}

const useSession = (): SessionData => {
  const { data, error } = useSWR(`${SERVER_URL}/session`, fetcher)
  return { data, error }
}

export default useSession
