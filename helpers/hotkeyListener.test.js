import { getHotkeyListener } from './hotkeyListener'

describe('getHotkeyListener helper function', () => {
  test('should return an event listener function', () => {
    expect(getHotkeyListener({})).toBeInstanceOf(Function)
  })
  test('ctrl+z should trigger callback and e.preventDefault()', () => {
    const callback = jest.fn()
    const eventListener = getHotkeyListener({ 'ctrl+z': callback })

    const fakeEvent = {
      key: 'z',
      metaKey: false,
      shiftKey: false,
      ctrlKey: true,
      preventDefault: jest.fn()
    }

    eventListener(fakeEvent)

    expect(callback).toBeCalled()
    expect(fakeEvent.preventDefault).toBeCalled()
  })

  test('cmd+z should trigger callback and e.preventDefault()', () => {
    const callback = jest.fn()
    const eventListener = getHotkeyListener({ 'cmd+z': callback })

    const fakeEvent = {
      key: 'z',
      metaKey: true,
      shiftKey: false,
      ctrlKey: false,
      preventDefault: jest.fn()
    }

    eventListener(fakeEvent)

    expect(callback).toBeCalled()
    expect(fakeEvent.preventDefault).toBeCalled()
  })

  test('shift+cmd+z should trigger callback and e.preventDefault()', () => {
    const callback = jest.fn()
    const eventListener = getHotkeyListener({ 'shift+cmd+z': callback })

    const fakeEvent = {
      key: 'z',
      metaKey: true,
      shiftKey: true,
      ctrlKey: false,
      preventDefault: jest.fn()
    }

    eventListener(fakeEvent)

    expect(callback).toBeCalled()
    expect(fakeEvent.preventDefault).toBeCalled()
  })

  test('"Shift" should not trigger callback ', () => {
    const callback = jest.fn()
    const eventListener = getHotkeyListener({ Shift: callback })

    const fakeEvent = {
      key: 'Shift',
      metaKey: false,
      shiftKey: true,
      ctrlKey: false,
      preventDefault: jest.fn()
    }

    eventListener(fakeEvent)

    expect(callback).not.toBeCalled()
  })

  test('"Control" should not trigger callback', () => {
    const callback = jest.fn()
    const eventListener = getHotkeyListener({ Control: callback })

    const fakeEvent = {
      key: 'Control',
      metaKey: false,
      shiftKey: false,
      ctrlKey: true,
      preventDefault: jest.fn()
    }

    eventListener(fakeEvent)

    expect(callback).not.toBeCalled()
  })

  test('unregistered key combination should not trigger e.preventdefault()', () => {
    const eventListener = getHotkeyListener({})

    const fakeEvent = {
      key: 'x',
      metaKey: false,
      shiftKey: false,
      ctrlKey: true,
      preventDefault: jest.fn()
    }

    eventListener(fakeEvent)

    expect(fakeEvent.preventDefault).not.toBeCalled()
  })
})
