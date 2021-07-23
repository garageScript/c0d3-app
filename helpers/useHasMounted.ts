import { useEffect, useState } from 'react'

/**
 * Helper function to prevent react hydration mismatches.
 * Use the returned boolean value to stop rendering of any code that
 * may cause potential server/client mismatch and break hydration.
 *
 * Any code that rely on 'Window' or 'Document' or any other client/server difference  can break hydration.
 * Hydration expects render trees to be the same on the server and client or hard to track down bugs can occur.
 *
 * @see https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 * @returns boolean - component has mounted
 */
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export default useHasMounted
