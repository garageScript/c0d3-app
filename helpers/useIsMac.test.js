import { renderHook } from '@testing-library/react-hooks/server'
import useIsMac from './useIsMac'

describe('useIsMac', () => {
  let userAgentGetter
  beforeEach(() => {
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
  })

  test('should default to false before hydration when no initialState is provided', () => {
    const { result } = renderHook(() => useIsMac())
    expect(result.current).toBe(false)
  })
  test('should return initialState before hydration', () => {
    const initialState = true
    const { result } = renderHook(() => useIsMac(initialState))
    expect(result.current).toBe(initialState)
  })
  test('should return true for Mac users after hydration ', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.78.2 (KHTML, like Gecko) Version/6.1.6 Safari/537.78'
    )
    const { result, hydrate } = renderHook(() => useIsMac(false))
    hydrate()
    expect(result.current).toBe(true)
  })
  test('should return false for non Mac users after hydration ', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
    )
    const { result, hydrate } = renderHook(() => useIsMac(false))
    hydrate()
    expect(result.current).toBe(false)
  })
})
