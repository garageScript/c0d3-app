import useReviewPageStorage from './useReviewPageStorage'

class MockLocalStorage {
  constructor() {
    this.store = {}
  }
  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = String(value)
  }
}

global.localStorage = new MockLocalStorage()

describe('Review Page Storage', () => {
  it('Should return object for sessionId and Line number', () => {
    const result = useReviewPageStorage(99, 99, {})
    expect(result).toEqual({})
  })

  it('Should return an object with isHidden set to true', () => {
    const result = useReviewPageStorage(99, 99, { isHidden: true })
    expect(result).toEqual({ isHidden: true })
  })

  it('Should return an object with content of "This is a test!" and isHidden of true', () => {
    const result = useReviewPageStorage(99, 99, {
      reviewText: 'This is a test!'
    })
    expect(result).toEqual({ isHidden: true, reviewText: 'This is a test!' })
  })

  it('Should create new entry in store', () => {
    const result = useReviewPageStorage(42, 42, {
      isHidden: false,
      content: 'This is another test'
    })
    expect(result).toEqual({
      isHidden: false,
      reviewText: 'This is another test'
    })
  })
})
