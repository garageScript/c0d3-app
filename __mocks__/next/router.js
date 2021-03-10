global.window = Object.create(window)
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/not-root' } // make sure pathname isnt '/' by default
})
const push = jest.fn(path => (global.window.location['pathname'] = path))
export const useRouter = jest.fn().mockImplementation(() => {
  return {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: push,
    replace: async () => true,
    reload: () => null,
    back: () => null
  }
})
