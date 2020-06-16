import noop from './noop'

describe('noop', () => {
  it('Does nothing', () => {
    expect(noop()).toEqual(undefined)
  })
})
