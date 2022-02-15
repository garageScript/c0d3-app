/**
 * @jest-environment node
 */
import {
  isSignedIn,
  isSignedInOrThrow,
  getUserId,
  getUserIdOrThrow
} from './getUserId'

const userSignedIn = { user: { id: 23 } }
const userNotSignedIn = {}

describe('isSignedIn helper', () => {
  describe('isSignedIn()', () => {
    test.each([
      [userSignedIn, true],
      [userNotSignedIn, false]
    ])('for req = %o should be %s', (req, expected) => {
      expect(isSignedIn(req)).toBe(expected)
    })
  })

  describe('isSignedInOrThrow', () => {
    test('should not throw if user is signed in', () => {
      expect(() => isSignedInOrThrow(userSignedIn)).not.toThrowError()
    })
    test('it should throw is user is not signed in', () => {
      expect(() => isSignedInOrThrow(userNotSignedIn).toThrowError())
    })
  })
})

describe('getUserId', () => {
  describe('getUserId()', () => {
    test.each([
      [userSignedIn, 23],
      [userNotSignedIn, -1]
    ])('for req = %o should be %s', (req, expected) => {
      expect(getUserId(req)).toBe(expected)
    })
  })
})

describe('getUserIdOrThrow', () => {
  test('should not throw if user is signed in', () => {
    expect(() => getUserIdOrThrow(userSignedIn)).not.toThrowError()
  })
  test('it should throw is user is not signed in', () => {
    expect(() => getUserIdOrThrow(userNotSignedIn).toThrowError())
  })
  test('it should return user id number', () => {
    expect(() => getUserIdOrThrow(userNotSignedIn).toEqual(23))
  })
})
