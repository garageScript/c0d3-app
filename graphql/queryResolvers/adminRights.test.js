import { adminRights } from './adminRights'

const ctx = { req: { user: { isAdmin: 'true' } } }

describe('adminRights resolver', () => {
  test('Should return true if person has admin rights', async () => {
    expect(adminRights(null, null, ctx)).toBeTruthy
  })

  test('Should return false if person has no admin rights', () => {
    ctx.req.user.isAdmin = 'false'
    expect(adminRights(null, null, ctx)).toBeFalsy
  })
})
