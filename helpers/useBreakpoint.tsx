import { useState, useEffect } from 'react'

// Breakpoint order
const index = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4
}

// Breakpoint pixels
const pixels = [0, 576, 768, 992, 1200]

/**
 * Hook uses media queries to trigger javascript events based on bootstrap breakpoints
 * @See https://getbootstrap.com/docs/4.6/layout/overview/#responsive-breakpoints
 * @param breakpoint Bootstrap breakpoints:
 * - xs: <576, sm: 576, md: 768, lg: 992, xl: 1200
 * @param condition Default 'down' IE lessThan
 *  - "down"  < breakpoint
 *  - "up"   >= breakpoint
 * @param initial default to false (Set this value to best guess for server side rendering)
 * @returns {boolean} - if breakpoint condition is met
 */
export default function useBreakpoint(
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  condition: 'down' | 'up' = 'down', // | 'only',
  initial = false
) {
  const [matches, setMatches] = useState(initial)
  useEffect(() => {
    if (
      (breakpoint === 'xs' && condition === 'up') ||
      (breakpoint === 'xl' && condition === 'down')
    ) {
      // These cases make no sense as they will always return true
      // so we skip attaching event listeners and return true
      // **Also sending a warning msg in non production mode to help developers
      setMatches(true)
      if (process.env.NODE_ENV !== 'production')
        console.warn(
          `Unnecessary useBreakpoint(${breakpoint},${condition}), this condition will always return true!`
        )

      return
    }

    const query =
      condition === 'up'
        ? `(min-width: ${pixels[index[breakpoint]]}px)`
        : `(max-width: ${pixels[index[breakpoint] + 1] - 0.02}px)`

    if (typeof window.matchMedia !== 'undefined') {
      const mql = window.matchMedia(query)
      // Update if different from initial value
      if (mql.matches !== matches) {
        setMatches(mql.matches)
      }
      const changeHandler = (e: MediaQueryListEvent) => setMatches(e.matches)

      mql.addEventListener('change', changeHandler)
      return () => mql.removeEventListener('change', changeHandler)
    }
  }, [])

  return matches
}
