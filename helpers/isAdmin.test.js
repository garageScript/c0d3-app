/**
 * @jest-environment node
 */
import { checkIsAdmin, isAdmin } from './isAdmin'

const adminReq = { user: { isAdmin: true } }
const nonAdminReq = { user: { isAdmin: false } }
const noSessionReq = {}

describe('isAdmin helper', () => {
  describe('isAdmin()', () => {
    test.each([
      [adminReq, true],
      [nonAdminReq, false],
      [noSessionReq, false]
    ])('for req = %o should be %s', (req, expected) => {
      expect(isAdmin(req)).toBe(expected)
    })
  })

  describe('checkIsAdmin()', () => {
    test('should not throw if user is admin', () => {
      expect(() => checkIsAdmin(adminReq)).not.toThrowError()
    })

    test.each([nonAdminReq, noSessionReq])(
      'should throw error for req = %o',
      req => {
        expect(() => checkIsAdmin(req)).toThrowError()
      }
    )
  })
})
