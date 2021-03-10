const push = jest.fn()
const query = {}
export const useRouter = jest.fn().mockImplementation(() => {
  return {
    route: '/',
    pathname: '/',
    query,
    asPath: '/',
    push: push,
    replace: async () => true,
    reload: () => null,
    back: () => null
  }
})
