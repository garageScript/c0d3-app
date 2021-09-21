import React from 'react'

type keydownEventListener = (e: React.KeyboardEvent) => void

/**
 * Given a hotkeyMap object
 *
 * ie: {"ctrl+z": someCallback, "cmd+z": someCallback}
 *
 * return a keydown eventListener that will call the corresponding callback and prevent default if key is detected
 * \* Currently hardcoded to only support these modifier combinations: "crtl+key" or "cmd+key" or "shift+cmd+key"
 */
export const getHotkeyListener =
  (hotkeyMap: { [hotkey: string]: () => void }): keydownEventListener =>
  e => {
    if (e.key === 'Control' || e.key === 'Shift' || !(e.ctrlKey || e.metaKey))
      return

    const detectedKeys = `${e.ctrlKey ? 'ctrl+' : ''}${
      e.shiftKey ? 'shift+' : ''
    }${e.metaKey ? 'cmd+' : ''}${e.key.toLowerCase()}`

    const callback = hotkeyMap[detectedKeys]
    if (callback) {
      e.preventDefault()
      callback()
    }
  }
