import React, { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { Button } from './theme/Button'
import noop from '../helpers/noop'

// style for both Markdown and textarea
const style = {
  padding: '1rem',
  width: '100%',
  marginTop: '.6rem'
}

// style only for Markdowwn
const MdStyle = {
  display: 'block',
  marginTop: 0
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

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Button onClick={() => preview && setPreview(false)} data-testid="write">
        Write
      </Button>
      <Button
        onClick={() => !preview && setPreview(true)}
        data-testid="preview"
      >
        Preview
      </Button>
      {displayOption}
    </div>
  )
}
