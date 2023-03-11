import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LOGIN_PATH } from '../constants'

/**
 * Redirects to login page if user is not authenticated.
 * With next query param to redirect back to this page after login.
 * @param {boolean} shouldRedirect Condition for redirection
 */
const useRedirectUnauthenticated = (shouldRedirect: boolean) => {
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push({
        pathname: LOGIN_PATH,
        query: { next: router.asPath }
      })
    }
  }, [shouldRedirect, router])
}

export default useRedirectUnauthenticated
