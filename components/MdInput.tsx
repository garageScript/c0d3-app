import React, { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { Button } from './theme/Button'
import noop from '../helpers/noop'

// style for both Markdown and textarea
const style = {
  padding: '1rem',
  width: '100%'
}

// style only for Markdowwn
const MdStyle = {
  display: 'block',
  marginTop: 0
}

// style only for Buttons
const btnStyle = {
  display: 'inline-block'
}

// styling to turn button background grey
const selectedBtnStyle = {
  ...btnStyle,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '0.25rem'
}

type MdInputProps = {
  onChange?: Function
  bgColor?: 'white' | 'none'
}

export const MdInput: React.FC<MdInputProps> = ({
  bgColor = 'none',
  onChange = noop
}) => {
  const [preview, setPreview] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setCommentValue(value)
    onChange(value)
  }

  const displayOption = preview ? (
    <Markdown data-testid="markdown" style={{ ...style, ...MdStyle }}>
      {commentValue}
    </Markdown>
  ) : (
    <textarea
      value={commentValue}
      onChange={handleChange}
      placeholder="Type something..."
      style={style}
      data-testid="textbox"
    />
  )

  // makes previewBtn or writeBtn background grey, depending on mode chosen
  const writeBtnStyle = preview ? btnStyle : selectedBtnStyle
  const previewBtnStyle = preview ? selectedBtnStyle : btnStyle

  return (
    <div style={{ backgroundColor: bgColor }}>
      <div style={writeBtnStyle}>
        <Button onClick={() => setPreview(false)}>Write</Button>
      </div>
      <div style={previewBtnStyle}>
        <Button onClick={() => setPreview(true)}>Preview</Button>
      </div>
      {displayOption}
    </div>
  )
}
