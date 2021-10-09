import React, { useState, useEffect, useRef } from 'react'
import Markdown from 'markdown-to-jsx'
import { colors } from './theme/colors'
import { Nav } from 'react-bootstrap'
import noop from '../helpers/noop'
import styles from '../scss/mdInput.module.scss'
import { getHotkeyListener } from '../helpers/hotkeyListener'
import useUndo from 'use-undo'

type TextAreaState = {
  value: string
  selectionStart: number
  selectionEnd: number
}

type MdInputProps = {
  onChange?: Function
  placeHolder?: string
  value?: string
  bgColor?: 'white' | 'none'
}

const autoSize = (el: HTMLTextAreaElement) => {
  // Set height auto to shrink size on delete
  el.style.height = 'auto'
  // Set height to match scrollHeight (+2 prevents scroll bar from showing)
  el.style.height = el.scrollHeight + 2 + 'px'
}

export const MdInput: React.FC<MdInputProps> = ({
  bgColor = 'none',
  onChange = noop,
  placeHolder = 'Type something...',
  value = ''
}) => {
  const [preview, setPreview] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mouseDownHeightRef = useRef<number | null>(null)
  const isMountedRef = useRef(false)
  const [height, setHeight] = useState<number | null>(null)

  // Undo/Redo state must be stored internally to allow custom manipulation of input text.
  // This is because any call besides 'onChange' events from the input wipe out the native undo/redo functionality.
  const [
    { present: internalState, past, future },
    { set: setInternalState, undo, redo, reset }
  ] = useUndo<TextAreaState>({
    value,
    selectionStart: value.length,
    selectionEnd: value.length
  })

  useEffect(() => {
    if (internalState.value !== value) {
      // Value was updated externally, reset component history
      reset({
        value,
        selectionStart: value.length,
        selectionEnd: value.length
      })
      return
    }
    // restore cursor position
    textareaRef.current?.setSelectionRange(
      internalState.selectionStart,
      internalState.selectionEnd
    )
  }, [value, internalState, reset])

  const updateState = ({
    value,
    selectionStart,
    selectionEnd
  }: TextAreaState) => {
    setInternalState({ value, selectionStart, selectionEnd })
    onChange(value)
    textareaRef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart, selectionEnd } = e.target

    updateState({ value, selectionStart, selectionEnd })
  }

  const handleUndo = () => {
    if (!past.length) return

    const nextState = past[past.length - 1]
    undo()
    onChange(nextState.value)
    textareaRef.current?.focus()
  }
  const handleRedo = () => {
    if (!future.length) return

    const nextState = future[0]
    redo()
    onChange(nextState.value)
    textareaRef.current?.focus()
  }

  useEffect(() => {
    // Focus when returning from preview mode after component has mounted
    if (!preview && isMountedRef.current) textareaRef.current?.focus()

    // Ref is used to prevent an unnecessary immediate re-render
    isMountedRef.current = true
  }, [preview])

  useEffect(() => {
    // Global event listener to capture mouse releases that may happen outside of the component
    const updateHeight = () => {
      if (!mouseDownHeightRef.current) return

      // Only update height if it changed
      if (
        textareaRef.current &&
        mouseDownHeightRef.current !== textareaRef.current.clientHeight
      )
        setHeight(textareaRef.current.clientHeight)

      // Always reset mouseDown ref
      mouseDownHeightRef.current = null
    }
    window.addEventListener('mouseup', updateHeight, false)

    return () => window.removeEventListener('mouseup', updateHeight, false)
  }, [])

  // Currently registering both linux/windows and mac hotkeys for everyone
  const hotkeyMap = {
    'ctrl+z': handleUndo,
    'cmd+z': handleUndo,
    'ctrl+y': handleRedo,
    'shift+cmd+z': handleRedo
  }

  const hotkeyListener = getHotkeyListener(hotkeyMap)

  const previewBtnColor = preview ? 'black' : 'lightgrey'
  const writeBtnColor = preview ? 'lightgrey' : 'black'

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Nav
        variant="tabs"
        defaultActiveKey="Write"
        activeKey={preview ? 'Preview' : 'Write'}
        onSelect={selectedKey => setPreview(selectedKey === 'Preview')}
      >
        <Nav.Item>
          <Nav.Link style={{ color: colors[writeBtnColor] }} eventKey="Write">
            Write
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={{ color: colors[previewBtnColor] }}
            eventKey="Preview"
          >
            Preview
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {preview && (
        <>
          {value ? (
            <Markdown
              data-testid="markdown"
              style={{
                minHeight:
                  Math.min(textareaRef.current?.clientHeight || Infinity, 500) +
                  'px'
              }}
              className={`${styles['preview']}`}
            >
              {value}
            </Markdown>
          ) : (
            // Using textArea class so minHeight stays in sync
            <div className={styles['textarea']}>Nothing to preview</div>
          )}
          <hr />
        </>
      )}
      <textarea
        onKeyDown={hotkeyListener}
        onMouseDown={() => {
          mouseDownHeightRef.current = textareaRef.current!.clientHeight
        }}
        ref={textareaRef}
        value={value}
        className={`${styles['textarea']}${preview ? ' d-none' : ''}`}
        onChange={e => {
          if (!height && textareaRef.current) autoSize(textareaRef.current)
          handleChange(e)
        }}
        placeholder={placeHolder}
        style={height ? { height: height + 'px' } : undefined}
        data-testid="textbox"
      />
    </div>
  )
}
