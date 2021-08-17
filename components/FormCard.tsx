import React from 'react'
import { Button } from './theme/Button'
import { MdInput } from './MdInput'
import { DropdownMenu, Item } from './DropdownMenu'
import _ from 'lodash'

export const DROP_DOWN = 'DROP_DOWN'

export const TEXT_AREA = 'TEXT_AREA'

export const MD_INPUT = 'MD_INPUT'

export type Option = {
  title: string
  type?: string
  error?: string
  placeHolder?: string
  value?: string | number | Item[]
}

type Btn = {
  title?: string
  onClick: Function
}

type FormCardProps = {
  values: Option[]
  onSubmit: Btn
  submitError?: string
  capitalizeTitle?: boolean
  onChange: Function
  title?: string
  border?: boolean
}

type OptionInfoProps = {
  option: Option
  capitalizeTitle?: boolean
  onChange: Function
  index: number
}

const displayInputType = (
  index: number,
  onChange: Function,
  option: Option
) => {
  const { placeHolder, type } = option
  const value: any = option.value
  switch (type) {
    case MD_INPUT:
      return (
        <MdInput
          bgColor="white"
          value={`${value || ''}`}
          onChange={(value: string) => {
            onChange(value, index)
          }}
        />
      )
    case DROP_DOWN:
      return <DropdownMenu title={value[0].title} items={value as Item[]} />
    default:
      return (
        <input
          type="text"
          className="form-control"
          data-testid={`input${index}`}
          value={`${value || ''}`}
          onChange={e => onChange(e.target.value, index)}
          placeholder={placeHolder || ''}
        />
      )
  }
}

const OptionInfo: React.FC<OptionInfoProps> = ({
  option,
  capitalizeTitle,
  onChange,
  index
}) => {
  const { title, error } = option
  if (title === 'id') return <></>
  return (
    <div className="d-flex flex-column ml-3 mr-3 mb-4">
      <h5 data-testid={`h5${title}${index}`}>
        {`${(capitalizeTitle && _.capitalize(title)) || title}`}
      </h5>
      {displayInputType(index, onChange, option)}
      {error && <h6 className="text-danger mb-0">{error}</h6>}
    </div>
  )
}

export const FormCard: React.FC<FormCardProps> = ({
  values,
  onSubmit,
  submitError,
  capitalizeTitle = true,
  title,
  onChange,
  border
}) => {
  const btnOnClick = () => onSubmit.onClick(values)

  const optionsList = values.map((option: Option, index: number) => (
    <OptionInfo
      onChange={onChange}
      capitalizeTitle={capitalizeTitle}
      option={option}
      index={index}
      key={index}
    />
  ))

  return (
    <div className={`row${border ? ' border' : ''}`}>
      <div className={`card shadow-sm col-12`}>
        <div className="card-body text-center">
          {title && (
            <h2 className="card-title font-weight-bold mb-3">{title}</h2>
          )}
        </div>
        <div className="text-left">{optionsList}</div>
        {submitError && <h6 className="text-danger">{submitError}</h6>}
        <div className="text-center mb-4">
          <Button onClick={btnOnClick} type="primary" color="white">
            {onSubmit.title}
          </Button>
        </div>
      </div>
    </div>
  )
}
