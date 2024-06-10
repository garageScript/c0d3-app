import React from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

export const LogoutContainer: React.FC = ({ children }) => {
  const router = useRouter()

  const handleOnClick = async () => {
    await signOut()

    window.localStorage.removeItem('loggedIn')
    router.push('/')
  }

  return <span onClick={handleOnClick}>{children}</span>
}

export default LogoutContainer
