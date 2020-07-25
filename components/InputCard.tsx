import React, { useState } from 'react'
import { Button } from './theme/Button'
import { MdInput } from './MdInput'

const capitalizeFirst = (str: string) => {
  return str.replace(/./, char => char.toUpperCase())
}
type Option = {
  title: string
  placeHolder?: string
  value?: string | number
}

type Btn = {
  title: string
  onClick?: Function
}

type InputCardProps = {
  values: Option[]
  buttons?: Btn[]
  capitalizeTitle?: boolean
  bgColor?: 'white' | 'none'
  title?: string
}

type ButtonsProps = {
  buttons: Btn[]
  options: Option[]
}

const Buttons: React.FC<ButtonsProps> = ({ buttons, options }) => {
  const btns = buttons.map((btn: Btn, i: number) => (
    <div style={{ display: 'inline-block', margin: 10 }} key={i}>
      <Button
        onClick={() => btn.onClick && btn.onClick(options)}
        type="success"
      >
        {btn.title}
      </Button>
    </div>
  ))

  return <>{btns}</>
}

export const InputCard: React.FC<InputCardProps> = ({
  values,
  buttons,
  capitalizeTitle = true,
  title,
  bgColor = 'white'
}) => {
  const [options, saveOptions] = useState(values)

  const handleChange = (value: string, i: number) => {
    const newOptions = [...options]
    newOptions[i].value = value
    saveOptions(newOptions)
  }

  const inputs = options.map((obj: Option, i: number) => {
    const { title, value, placeHolder } = obj
    if (obj.title === 'id') return []
    return (
      <div
        key={i}
        className="d-flex flex-column"
        style={{
          border: '3px solid rgb(84, 64, 216, .3)',
          padding: '10px',
          backgroundColor: 'rgb(84, 64, 216, .04)',
          textAlign: 'left',
          marginBottom: i === options.length - 1 ? 0 : 10
        }}
      >
        <h5 data-testid={`h5${title}${i}`}>
          {(capitalizeTitle && capitalizeFirst(title)) || title}
        </h5>
        {title === 'description' && (
          <MdInput
            bgColor="white"
            value={(value && value + '') || ''}
            onChange={(value: string) => handleChange(value, i)}
          />
        )}
        {title !== 'description' && (
          <input
            data-testid={`input${title}`}
            style={{ border: '1px solid rgb(84, 64, 216, .3)' }}
            type="text"
            value={(value && value + '') || ''}
            onChange={e => handleChange(e.target.value, i)}
            className="form-control"
            placeholder={placeHolder || ''}
            aria-label=""
            aria-describedby="basic-addon1"
          />
        )}
      </div>
    )
  })

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 10,
        backgroundColor: bgColor,
        border: '2px solid rgb(0,0,0,.3)'
      }}
    >
      {title && (
        <h2 style={{ textDecoration: 'underline', marginBottom: 20 }}>
          {title}
        </h2>
      )}
      {inputs}
      {buttons && <Buttons buttons={buttons} options={options} />}
    </div>
  )
}
