import React from 'react'
import { useRouter } from 'next/router'
import { useLogoutMutation } from '../graphql'

export const LogoutContainer: React.FC = ({ children }) => {
  const router = useRouter()
  const [logoutUser] = useLogoutMutation({
    update(cache) {
      cache.modify({
        fields: {
          session() {
            return { lessonStatus: [] }
          }
        },
        broadcast: false
      })
    },
    onCompleted: () => {
      window.localStorage.removeItem('loggedIn')
      router.push('/')
    }
  })
  return <span onClick={() => logoutUser()}>{children}</span>
}

export default LogoutContainer
