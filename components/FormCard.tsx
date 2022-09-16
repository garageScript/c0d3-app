import React, { useState } from 'react'
import { Button, NewButton } from './theme/Button'
import { MdInput } from './MdInput'
import { DropdownMenu, Item } from './DropdownMenu'
import _ from 'lodash'
import styles from '../scss/formCard.module.scss'
import { AlertFillIcon } from '@primer/octicons-react'

export const DROP_DOWN = 'DROP_DOWN'

export const TEXT_AREA = 'TEXT_AREA'

export const MD_INPUT = 'MD_INPUT'

export type TextField = Omit<Option, 'value'> & { value: string }

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
  noBg?: boolean
  align?: 'center' | 'left' | 'right'
  newBtn?: boolean
}

type OptionInfoProps = {
  option: Option
  capitalizeTitle?: boolean
  onChange: Function
  index: number
  mdInputBg?: 'white' | 'none'
}

const displayInputType = (
  index: number,
  onChange: Function,
  option: Option,
  mdInputBg?: 'white' | 'none'
) => {
  const [cursorInput, setCursorInput] = useState<number | null>(0)
  const [cursorMdInput, setCursorMdInput] = useState<number | null>(0)

  const { placeHolder, type } = option
  const value: any = option.value
  switch (type) {
    case MD_INPUT:
      return (
        <MdInput
          bgColor={mdInputBg}
          value={`${value || ''}`}
          onChange={(value: string, selectionStart: number) => {
            onChange(value, index)
            setCursorMdInput(selectionStart)
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => {
            e.target.selectionStart = cursorMdInput
          }}
        />
      )
    case DROP_DOWN:
      return <DropdownMenu title={value[0].title} items={value as Item[]} />
    default:
      return (
        <input
          type="text"
          className={`form-control ${styles.optionInfo__input}`}
          data-testid={`input${index}`}
          value={`${value || ''}`}
          onChange={e => {
            onChange(e.target.value, index)
            setCursorInput(e.target.selectionStart)
          }}
          onFocus={e => {
            e.target.selectionStart = cursorInput
          }}
          placeholder={placeHolder || value || ''}
        />
      )
  }
}

const ErrorMessage = ({ error }: { error: string }) => (
  <h6 className={`text-danger mt-2 mb-0 ${styles.optionInfo__error}`}>
    <AlertFillIcon size={14} />
    {error}
  </h6>
)

const OptionInfo: React.FC<OptionInfoProps> = ({
  option,
  capitalizeTitle,
  onChange,
  index,
  mdInputBg
}) => {
  const { title, error } = option
  if (title === 'id') return <></>
  return (
    <div className="d-flex flex-column mb-4">
      <span
        data-testid={`span${title}${index}`}
        className={styles.optionInfo__span}
      >
        {`${(capitalizeTitle && _.capitalize(title)) || title}`}
      </span>
      {displayInputType(index, onChange, option, mdInputBg)}
      {error && <ErrorMessage error={error} />}
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
  border,
  noBg,
  newBtn,
  align
}) => {
  const btnOnClick = () => onSubmit.onClick(values)

  const optionsList = values.map((option: Option, index: number) => (
    <OptionInfo
      mdInputBg={noBg ? 'none' : 'white'}
      onChange={onChange}
      capitalizeTitle={capitalizeTitle}
      option={option}
      index={index}
      key={index}
    />
  ))

  const textAlignment =
    align === 'center' ? 'center' : align === 'right' ? 'end' : 'start'
  const noBgStyles = noBg ? 'bg-transparent shadow-none border-0 py-0' : 'py-4'

  return (
    <div className={`row${border ? ' border' : ''}`}>
      <div
        className={`${noBgStyles} px-3 card shadow-sm col-12 align-items-stretch`}
      >
        <div
          className={`p-0 card-body text-center align-self-${textAlignment}`}
        >
          {title && <h3 className={`card-title fw-bold mb-4`}>{title}</h3>}
        </div>
        <div className="text-start">{optionsList}</div>
        {submitError && <ErrorMessage error={submitError} />}
        <div className={`text-center align-self-${textAlignment}`}>
          {newBtn ? (
            <NewButton onClick={btnOnClick}>{onSubmit.title}</NewButton>
          ) : (
            <Button onClick={btnOnClick} type="primary" color="white">
              {onSubmit.title}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
