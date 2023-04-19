import React, { useState, useEffect, useRef } from 'react'
import { colors } from '../theme/colors'
import { Nav } from 'react-bootstrap'
import noop from '../../helpers/noop'
import styles from './mdInput.module.scss'
import { getHotkeyListener } from '../../helpers/hotkeyListener'
import useUndo from 'use-undo'
import useBreakpoint from '../../helpers/useBreakpoint'
import useIsMac from '../../helpers/useIsMac'
import MarkdownToolbar from '../MarkdownToolbar'
import { markdown, TextAreaState } from '../../helpers/textStylers'
import HighlightMarkdown from '../mdx/HighlightMarkdown/HighlightMarkdown'

type MdInputProps = {
  onChange?: Function
  onFocus?: Function
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

const MdInput: React.FC<MdInputProps> = ({
  bgColor = 'none',
  onChange = noop,
  onFocus = noop,
  placeHolder = 'Type something...',
  value = ''
}) => {
  const [preview, setPreview] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mouseDownHeightRef = useRef<number | null>(null)
  const isMountedRef = useRef(false)
  const [height, setHeight] = useState<number | null>(null)
  const lessThanMd = useBreakpoint('md')
  const isMac = useIsMac(false)

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
    if (!height && textareaRef.current) autoSize(textareaRef.current)

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
    onChange(value, selectionStart)
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

  const handleMarkdown =
    (styler: (i: HTMLTextAreaElement) => TextAreaState) => () => {
      /*istanbul ignore else*/
      if (textareaRef.current) updateState(styler(textareaRef.current))
    }

  // Any changes to the markdown related hotkeys also need to have
  // their tooltips in, MarkdownToolbar.tsx, manually kept in sync
  //
  // NOTE: Any hotkey that includes a 'shift' key will always return
  // the shift key value, ie: `ctrl+shift+*' is really 'ctrl+shift+8'
  const hotkeyListener = isMac
    ? getHotkeyListener({
        'cmd+z': handleUndo,
        'shift+cmd+z': handleRedo,
        'cmd+b': handleMarkdown(markdown.bold),
        'cmd+i': handleMarkdown(markdown.italic),
        'shift+cmd+>': handleMarkdown(markdown.quote),
        'cmd+e': handleMarkdown(markdown.code),
        'cmd+k': handleMarkdown(markdown.link),
        'shift+cmd+*': handleMarkdown(markdown.bulletList),
        'shift+cmd+&': handleMarkdown(markdown.orderedList)
      })
    : getHotkeyListener({
        'ctrl+z': handleUndo,
        'ctrl+y': handleRedo,
        'ctrl+b': handleMarkdown(markdown.bold),
        'ctrl+i': handleMarkdown(markdown.italic),
        'ctrl+shift+>': handleMarkdown(markdown.quote),
        'ctrl+e': handleMarkdown(markdown.code),
        'ctrl+k': handleMarkdown(markdown.link),
        'ctrl+shift+*': handleMarkdown(markdown.bulletList),
        'ctrl+shift+&': handleMarkdown(markdown.orderedList)
      })

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
        {!preview && !lessThanMd && (
          <MarkdownToolbar
            isMac={isMac}
            inputRef={textareaRef}
            onChange={updateState}
            className="ms-auto"
          />
        )}
      </Nav>
      {!preview && lessThanMd && (
        <MarkdownToolbar
          isMac={isMac}
          inputRef={textareaRef}
          onChange={updateState}
        />
      )}
      {preview && (
        <>
          {value ? (
            <HighlightMarkdown
              data-testid="markdown"
              className={styles.preview}
            >
              {value}
            </HighlightMarkdown>
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
        onChange={handleChange}
        placeholder={placeHolder}
        style={height ? { height: height + 'px' } : undefined}
        data-testid="textbox"
        onFocus={e => onFocus(e)}
      />
    </div>
  )
}

export default MdInput
