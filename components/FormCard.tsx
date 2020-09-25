import React from 'react'
import { Button } from './theme/Button'
import { MdInput } from './MdInput'

// capitalizes first letter of a string
const capitalizeFirst = (str: string) => {
  return str.replace(/./, char => char.toUpperCase())
}

export const TEXT_AREA = 'TEXT_AREA'

export const MD_INPUT = 'MD_INPUT'

export type Option = {
  title: string
  type?: string | undefined
  error?: string
  placeHolder?: string
  value?: string | number
}

type Btn = {
  title?: string
  onClick: (value: any) => void
}

type OptionProps = {
	option: Option
  capitalizeTitle?: boolean
  onChange: Function
}

type FormCardProps = {
  values: Option[]
  onSubmit: Btn
  capitalizeTitle?: boolean
  onChange: Function
  title?: string
}

type OptionsListProps = {
  onChange: Function
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

export const OptionsList: React.FC<OptionsListProps> = ({
  onChange,
  capitalizeTitle,
  options
}) => {
  const inputs = options.map((option: Option, i: number) => {
    const { title, value, placeHolder, type } = option
    if (option.title === 'id') return []
    const inputType =
      type === MD_INPUT ? (
        <MdInput
          bgColor="white"
          value={`${value || ''}`}
          onChange={(value: string) => {
            onChange(value, i)
          }}
        />
      ) : (
        <input
          data-testid={`input${i}`}
          style={{ border: '1px solid rgb(84, 64, 216, .3)' }}
          type="text"
          value={`${value || ''}`}
          onChange={e => {
            onChange(e.target.value, i)
          }}
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
        {option.error && (
          <>
            <h6 className="text-danger">{option.error}</h6>
          </>
        )}
      </div>
    )
  })

  return <>{inputs}</>
}

const Option React.FC: <OptionProps> = ({onChange, capitalizeTitle, option}) => {
const { title, value, placeHolder, type } = option
    if (option.title === 'id') return []
    const inputType =
      type === MD_INPUT ? (
        <MdInput
          bgColor="white"
          value={`${value || ''}`}
          onChange={(value: string) => {
            onChange(value, i)
          }}
        />
      ) : (
        <input
          data-testid={`input${i}`}
          style={{ border: '1px solid rgb(84, 64, 216, .3)' }}
          type="text"
          value={`${value || ''}`}
          onChange={e => {
            onChange(e.target.value, i)
          }}
          placeholder={placeHolder || ''}
        />
     
}

export const FormCard: React.FC<FormCardProps> = ({
  values,
  onSubmit,
  capitalizeTitle = true,
  title,
  onChange
}) => {
  const btnOnClick = () => onSubmit.onClick(values)

  return (
    <div style={formStyle} className="rounded">
      {title && <h2 style={titleStyle}>{title}</h2>}
      <OptionsList
        capitalizeTitle={capitalizeTitle}
        options={values}
        onChange={onChange}
      />
      <div style={{ margin: 10 }}>
        <Button onClick={btnOnClick} type="success">
          {onSubmit.title}
        </Button>
      </div>
    </div>
  )
}
