import { withAdminContainer } from './withAdminContainer'

const adminMockReq = { req: { user: { isAdmin: true, id: 1 } } }
const noAdminMockReq = { req: { user: { isAdmin: false, id: 1 } } }

const mockAdminContainer = withAdminContainer(async _parent => {
  return true
}, 'errorMessage')

describe('withAdminContainer test', () => {
  test('if there is admin error and errorMessage is provided, it should throw errorMessage', () => {
    expect.assertions(1)

    expect(
      mockAdminContainer({}, { name: 'John', title: 'Doe' }, noAdminMockReq)
    ).rejects.toThrow(new Error('errorMessage'))
  })

  test('if there is no admin error, it should execute the resolver function passed in', () => {
    expect.assertions(1)

    expect(
      mockAdminContainer({}, { name: 'John', title: 'Doe' }, adminMockReq)
    ).resolves.toEqual(true)
  })
})
