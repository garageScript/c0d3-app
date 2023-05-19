import React from 'react'
import {
  HeadingIcon,
  BoldIcon,
  ItalicIcon,
  QuoteIcon,
  CodeIcon,
  LinkIcon,
  ListUnorderedIcon,
  ListOrderedIcon,
  Icon
} from '@primer/octicons-react'
import { ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { markdown, TextAreaState } from '../../helpers/textStylers'

type ButtonProps = {
  tooltipTitle: string
  hotkey?: string
  macHotkey?: string
  handleMarkdown: (i: HTMLTextAreaElement) => TextAreaState
  Icon: Icon
}

// The hotkeys are registered in the MdInput.tsx files hotkeyMap
// Any changes to the hotkeys here will need to match those hotkeys
const buttons: ButtonProps[] = [
  {
    tooltipTitle: 'Add header text',
    handleMarkdown: markdown.header,
    Icon: HeadingIcon
  },
  {
    tooltipTitle: 'Add bold text',
    hotkey: 'ctrl+b',
    macHotkey: 'cmd+b',
    handleMarkdown: markdown.bold,
    Icon: BoldIcon
  },
  {
    tooltipTitle: 'Add italic text',
    hotkey: 'ctrl+i',
    macHotkey: 'cmd+i',
    handleMarkdown: markdown.italic,
    Icon: ItalicIcon
  },
  {
    tooltipTitle: 'Insert a quote',
    hotkey: 'ctrl+shift+.',
    macHotkey: 'cmd+shift+.',
    handleMarkdown: markdown.quote,
    Icon: QuoteIcon
  },
  {
    tooltipTitle: 'Insert code',
    hotkey: 'ctrl+e',
    macHotkey: 'cmd+e',
    handleMarkdown: markdown.code,
    Icon: CodeIcon
  },
  {
    tooltipTitle: 'Add a link',
    hotkey: 'ctrl+k',
    macHotkey: 'cmd+k',
    handleMarkdown: markdown.link,
    Icon: LinkIcon
  },
  {
    tooltipTitle: 'Add a bulleted list',
    hotkey: 'ctrl+shift+8',
    macHotkey: 'cmd+shift+8',
    handleMarkdown: markdown.bulletList,
    Icon: ListUnorderedIcon
  },
  {
    tooltipTitle: 'Add a numbered list',
    hotkey: 'ctrl+shift+7',
    macHotkey: 'cmd+shift+7',
    handleMarkdown: markdown.orderedList,
    Icon: ListOrderedIcon
  }
]

type Props = {
  isMac: boolean
  className?: string
  inputRef: React.RefObject<HTMLTextAreaElement>
  onChange: (i: TextAreaState) => void
}

const MarkdownToolbar: React.FC<Props> = ({
  isMac,
  inputRef,
  onChange,
  className = ''
}) => {
  return (
    <ButtonToolbar className={className}>
      {buttons.map(
        ({ tooltipTitle, handleMarkdown, Icon, macHotkey, hotkey }, i) => {
          const hotkeyString = isMac ? macHotkey : hotkey
          const tooltipWithHotkey =
            tooltipTitle + (hotkeyString ? ` <${hotkeyString}>` : '')
          return (
            <OverlayTrigger
              key={i}
              placement="bottom-end"
              delay={{ show: 200, hide: 100 }}
              overlay={<Tooltip id="btn-tooltip">{tooltipWithHotkey}</Tooltip>}
            >
              {({ ref, ...triggerHandler }) => {
                return (
                  <button
                    className="btn"
                    {...triggerHandler}
                    ref={ref}
                    aria-label={tooltipWithHotkey}
                    onClick={() => {
                      inputRef.current &&
                        onChange(handleMarkdown(inputRef.current))
                    }}
                  >
                    <Icon size={'small'} />
                  </button>
                )
              }}
            </OverlayTrigger>
          )
        }
      )}
    </ButtonToolbar>
  )
}

export default MarkdownToolbar
