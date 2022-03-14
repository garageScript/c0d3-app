import React from 'react'
import { useRouter } from 'next/router'
import { useLogoutMutation } from '../graphql'
import { signOut } from 'next-auth/react'

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
    onCompleted: () => {}
  })
  return (
    <span
      onClick={() => {
        // logoutUser()
        signOut().then(() => {
          window.localStorage.removeItem('loggedIn')
          router.push('/')
        })
      }}
    >
      {children}
    </span>
  )
}

export default LogoutContainer
