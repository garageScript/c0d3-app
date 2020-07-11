import React, { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { Button } from './theme/Button'
import noop from '../helpers/noop'

// style for textarea
const textBoxStyle = {
  padding: '1rem',
  width: '100%'
}

// style for Markdown
const MdStyle = {
  ...textBoxStyle,
  display: 'block'
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
    <Markdown data-testid="markdown" style={MdStyle}>
      {commentValue}
    </Markdown>
  ) : (
    <textarea
      value={commentValue}
      onChange={handleChange}
      placeholder="Type something..."
      style={textBoxStyle}
      data-testid="textbox"
    />
  )

  const previewBtnColor = preview ? 'black' : 'lightgrey'
  const writeBtnColor = preview ? 'lightgrey' : 'black'

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Button color={writeBtnColor} onClick={() => setPreview(false)}>
        Write
      </Button>
      <Button color={previewBtnColor} onClick={() => setPreview(true)}>
        Preview
      </Button>
      {displayOption}
    </div>
  )
}
