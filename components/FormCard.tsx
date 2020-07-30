import React, { useState } from 'react'
import { Button } from './theme/Button'
import { MdInput } from './MdInput'

// capitalizes first letter of a string
const capitalizeFirst = (str: string) => {
  return str.replace(/./, char => char.toUpperCase())
}

//only show error when someone press submit and file id not correct
export type Error = 'require' | 'nums'

type Option = {
  title: string
  type?: 'MD_INPUT' | 'TEXT_AREA' | undefined
  error?: Error[]
  placeHolder?: string
  value?: string | number
}

type Btn = {
  title?: string
  onClick: Function
}

type FormCardProps = {
  values: Option[]
  onSubmit: Btn
  capitalizeTitle?: boolean
  title?: string
}

type OptionsListProps = {
  errors: any
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

export const OptionsList: React.FC<OptionsListProps> = ({
  handleChange,
  capitalizeTitle,
  options,
  errors
}) => {
  const inputs = options.map((option: Option, i: number) => {
    const { title, value, placeHolder, type } = option
    if (option.title === 'id') return []
    const inputType =
      type === 'MD_INPUT' ? (
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
        {errors && errors[i] && (
          <>
            <h6 className="text-danger">{errors[i]}</h6>
          </>
        )}
      </div>
    )
  })

  return <>{inputs}</>
}

const errMsg = {
  nums: 'Numbers only.',
  require: 'Required'
}

const numCheck: any = (value: any) => !value.match(/^[0-9]+$/)

// table of functions that check for errors
const errorChecks = {
  nums: (value: any) => numCheck(value),
  require: (value: any) => !value
}

const errorDetected = (options: Option[]) => {
  let errorSeen = false
  const res = options.reduce((acc: any, option: Option, i: number) => {
    if (!option.error || !option.error.length) return acc

    //Finds all errors for the current option
    option.error.forEach((err: Error) => {
      if (errorChecks[err](option.value + '')) {
        errorSeen = true
        acc[i] = [errMsg[err]]
      }
    })
    return acc
  }, {})
  return errorSeen ? res : false
}

export const FormCard: React.FC<FormCardProps> = ({
  values,
  onSubmit,
  capitalizeTitle = true,
  title
}) => {
  const [options, saveOptions] = useState(values)
  const [err, setErr] = useState(false)

  const handleChange = (value: string, i: number) => {
    const newOptions = [...options]
    newOptions[i].value = value
    saveOptions(newOptions)
  }

  const btnOnClick = () => {
    const detect = errorDetected(options)

    /*
			callback onSubmit function will not be called if error
			has been detected
		*/
    if (detect) {
      setErr(detect)
      return
    }
    onSubmit.onClick(options)
    setErr(false)
  }

  return (
    <div style={formStyle} className="rounded">
      {title && <h2 style={titleStyle}>{title}</h2>}
      <OptionsList
        capitalizeTitle={capitalizeTitle}
        errors={err}
        options={options}
        handleChange={handleChange}
      />
      <div style={{ margin: 10 }}>
        <Button onClick={btnOnClick} type="success">
          {onSubmit.title}
        </Button>
      </div>
    </div>
  )
}
