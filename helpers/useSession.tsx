import useSWR from 'swr'
import { request } from 'graphql-request'
import _ from 'lodash'

const SERVER_URL = process.env.SERVER_URL

export const fetcher = (query: any) => request(SERVER_URL || '/api/graphql', query)

type User = {
  user: {
    username: string
  }
}

export type SessionData = {
  session: User | null
}

const useSession = (): SessionData => {
  const { data } = useSWR(`
      {
        session {
          user {
            username
          }
        }
      }
    
    `, fetcher)
  const session = _.get(data, 'session', null)
  return { session }
}

export default useSession
