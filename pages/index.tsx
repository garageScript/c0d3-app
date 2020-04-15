import * as React from 'react'
import Curriculum from './curriculum'
import Home from './home'
import useSWR from 'swr'

export const AuthUserContext = React.createContext<any>(null)

const SERVER_URL = process.env.SERVER_URL

export const fetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

const IndexPage: React.FC = () => {
  const { data, error } = useSWR(`${SERVER_URL}/session`, fetcher)
  let Component = Home

  // while loading, don't show anything to user
  if (!data && !error) {
    return <h1>Loading</h1>
  }

  if (data && data.userInfo) {
    Component = Curriculum
  }

  return (
    <AuthUserContext.Provider value={data && data.userInfo}>
      <Component />
    </AuthUserContext.Provider>
  )
}

export default IndexPage
