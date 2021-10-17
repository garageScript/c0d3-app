import { useState, useEffect } from 'react'

/**
 * Simple Hook that returns true if the user is on a mac
 *
 * Will first render with intialState before useEffect fires
 * and detects actual operating system. This is required to
 * not cause hydration mismatches with server side rendering.
 */
const useIsMac = (initialState: boolean = false) => {
  const [isMac, setIsMac] = useState(initialState)
  useEffect(() => {
    if (navigator.userAgent.indexOf('Mac') !== -1) setIsMac(true)
  }, [])

  return isMac
}

export default useIsMac
