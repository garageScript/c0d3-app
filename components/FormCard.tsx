import React, { useState } from 'react'
import { Button } from './theme/Button'
import { MdInput } from './MdInput'

// capitalizes first letter of a string
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

type FormCardProps = {
  values: Option[]
  buttons?: Btn[]
  capitalizeTitle?: boolean
  title?: string
}

type ButtonsProps = {
  buttons: Btn[]
  options: Option[]
}

type OptionsListProps = {
  handleChange: (value: string, i: number) => void
  capitalizeTitle: boolean
  options: Option[]
}

const titleStyle: React.CSSProperties | undefined = {
  textDecoration: 'underline',
  marginBottom: 20
}

const formStyle: React.CSSProperties | undefined = {
  textAlign: 'center',
  padding: '10px',
  border: '2px solid rgb(0,0,0,.3)',
  backgroundColor: 'white'
}

const optionStyle: React.CSSProperties | undefined = {
  border: '3px solid rgb(84, 64, 216, .3)',
  padding: '10px',
  backgroundColor: 'rgb(84, 64, 216, .04)',
  textAlign: 'left'
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

export const OptionsList: React.FC<OptionsListProps> = ({
  handleChange,
  capitalizeTitle,
  options
}) => {
  const inputs = options.map((option: Option, i: number) => {
    const { title, value, placeHolder } = option
    if (option.title === 'id') return []
    const inputType =
      title === 'description' ? (
        <MdInput
          bgColor="white"
          value={(value && value + '') || ''}
          onChange={(value: string) => handleChange(value, i)}
        />
      ) : (
        <input
          data-testid={`input${title}`}
          style={{ border: '1px solid rgb(84, 64, 216, .3)' }}
          type="text"
          value={(value && value + '') || ''}
          onChange={e => handleChange(e.target.value, i)}
          placeholder={placeHolder || ''}
        />
      )
    return (
      <div
        key={i}
        className="d-flex flex-column"
        style={{
          ...optionStyle,
          marginBottom: i === options.length - 1 ? 0 : 10
        }}
      >
        <h5 data-testid={`h5${title}${i}`}>
          {(capitalizeTitle && capitalizeFirst(title)) || title}
        </h5>
        {inputType}
      </div>
    )
  })

  return <>{inputs}</>
}

export const FormCard: React.FC<FormCardProps> = ({
  values,
  buttons,
  capitalizeTitle = true,
  title
}) => {
  const [options, saveOptions] = useState(values)

  const handleChange = (value: string, i: number) => {
    const newOptions = [...options]
    newOptions[i].value = value
    saveOptions(newOptions)
  }

  return (
    <div style={formStyle} className="rounded">
      {title && <h2 style={titleStyle}>{title}</h2>}
      <OptionsList
        capitalizeTitle={capitalizeTitle}
        options={options}
        handleChange={handleChange}
      />
      {buttons && <Buttons buttons={buttons} options={options} />}
    </div>
  )
}
