import '../__mocks__/matchMedia.mock'
import { renderHook, act } from '@testing-library/react-hooks/server'
import useBreakpoint from './useBreakpoint'

describe('useBreakpoint', () => {
  beforeAll(() => {
    global.console.warn = jest.fn()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test.each`
    initial  | expected
    ${true}  | ${true}
    ${false} | ${false}
  `(
    'should first return initial value: $initial -> $initial',
    ({ initial, expected }) => {
      const { result } = renderHook(() => useBreakpoint('xs', 'down', initial))
      expect(result.current).toBe(expected)
    }
  )

  test.each`
    matches  | expected
    ${true}  | ${true}
    ${false} | ${false}
  `(
    'should then return matches value after hydrate: $matches -> $matches',
    ({ matches, expected }) => {
      window.matchMedia.mockImplementation(query => ({
        matches,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }))

      const { result, hydrate } = renderHook(() =>
        useBreakpoint('xs', 'down', false)
      )
      hydrate()

      expect(result.current).toBe(expected)
    }
  )

  test('should add and remove mediaQuery event listeners on mount / unmount', () => {
    const mockAddEventListener = jest.fn()
    const mockRemoveEventListener = jest.fn()
    window.matchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    }))

    const { result, hydrate, unmount } = renderHook(() =>
      useBreakpoint('xs', 'down', false)
    )
    hydrate()
    expect(mockAddEventListener).toHaveBeenCalled()
    unmount()
    expect(mockRemoveEventListener).toHaveBeenCalled()
  })

  test('should not attach change event listener if matchMedia is undefined', () => {
    expect.assertions(1)

    const mockAddEventListener = jest.fn()
    const mockRemoveEventListener = jest.fn()

    window.matchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    }))

    const initialMatchMediaValue = window.matchMedia

    window.matchMedia = undefined

    const { result, hydrate, unmount } = renderHook(() =>
      useBreakpoint('xs', 'down', false)
    )

    hydrate()

    expect(mockAddEventListener).not.toHaveBeenCalled()

    window.matchMedia = initialMatchMediaValue
  })

  test('should update matches when event listener is called', () => {
    const mockAddEventListener = jest.fn()
    const mockRemoveEventListener = jest.fn()
    window.matchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    }))

    const { result, hydrate, unmount } = renderHook(() =>
      useBreakpoint('xs', 'down', false)
    )
    hydrate()
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
    // Get ref to changeHandler from first call to setup mediaQuery.addEventListener
    const changeHandler = mockAddEventListener.mock.calls[0][1]

    act(() => {
      changeHandler({ matches: false })
    })
    expect(result.current).toBe(false)

    act(() => {
      changeHandler({ matches: true })
    })
    expect(result.current).toBe(true)
  })

  // The expected results from this test are meant to exactly match the bootstrap 4.6 queries
  // @see https://getbootstrap.com/docs/4.6/layout/overview/#responsive-breakpoints
  test.each`
    breakpoint | condition | expected
    ${'sm'}    | ${'up'}   | ${'(min-width: 576px)'}
    ${'md'}    | ${'up'}   | ${'(min-width: 768px)'}
    ${'lg'}    | ${'up'}   | ${'(min-width: 992px)'}
    ${'xl'}    | ${'up'}   | ${'(min-width: 1200px)'}
    ${'xs'}    | ${'down'} | ${'(max-width: 575.98px)'}
    ${'sm'}    | ${'down'} | ${'(max-width: 767.98px)'}
    ${'md'}    | ${'down'} | ${'(max-width: 991.98px)'}
    ${'lg'}    | ${'down'} | ${'(max-width: 1199.98px)'}
  `(
    'media queries should be same at bootstrap docs: $breakpoint-$condition -> $expected',
    ({ breakpoint, condition, expected }) => {
      window.matchMedia.mockImplementation(query => ({
        matches: true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }))

      const { result, hydrate } = renderHook(() =>
        useBreakpoint(breakpoint, condition, false)
      )
      hydrate()
      expect(window.matchMedia).toBeCalledWith(expected)
    }
  )

  test('if no condition value is provided default to "down"', () => {
    window.matchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))

    const { result, hydrate } = renderHook(() => useBreakpoint('xs'))
    hydrate()
    expect(window.matchMedia).toBeCalledWith('(max-width: 575.98px)')
  })

  test.each`
    breakpoint | condition
    ${'xs'}    | ${'up'}
    ${'xl'}    | ${'down'}
  `(
    'should console.warning for $breakpoint-$condition as it will always be true',
    ({ breakpoint, condition }) => {
      const { result, hydrate } = renderHook(() =>
        useBreakpoint(breakpoint, condition, false)
      )
      hydrate()
      expect(result.current).toBe(true)
      expect(global.console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Unnecessary useBreakpoint(')
      )
    }
  )
  test.each`
    breakpoint | condition
    ${'xs'}    | ${'up'}
    ${'xl'}    | ${'down'}
  `(
    'should not show console.warn in production mode ',
    ({ breakpoint, condition }) => {
      // mock NODE_ENV
      const REAL_NODE_ENV = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      const { result, hydrate } = renderHook(() =>
        useBreakpoint(breakpoint, condition, false)
      )
      hydrate()
      expect(result.current).toBe(true)
      expect(global.console.warn).not.toHaveBeenCalled()

      // reset NODE_ENV
      process.env.NODE_ENV = REAL_NODE_ENV
    }
  )
})
