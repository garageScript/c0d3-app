const push = jest.fn()
const back = jest.fn()
const query = {}
export const useRouter = jest.fn().mockImplementation(() => {
  return {
    route: '/',
    pathname: '/',
    query,
    asPath: '/',
    push,
    replace: async () => true,
    reload: () => null,
    back
  }
})
