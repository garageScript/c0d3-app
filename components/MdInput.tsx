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
  display: 'block',
  width: 'inherit'
}

type MdInputProps = {
  onChange?: Function
  placeHolder?: string
  value?: string
  bgColor?: 'white' | 'none'
}

export const MdInput: React.FC<MdInputProps> = ({
  bgColor = 'none',
  onChange = noop,
  placeHolder = 'Type something...',
  value = ''
}) => {
  const [preview, setPreview] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    onChange(value)
  }

  const displayOption = preview ? (
    <Markdown data-testid="markdown" style={MdStyle}>
      {value}
    </Markdown>
  ) : (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
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
