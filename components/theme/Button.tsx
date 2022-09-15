import React from 'react'
import styles from '../../scss/button.module.scss'

import { ColorTypes, colors } from './colors'
import noop from '../../helpers/noop'

type ButtonProps = {
  border?: boolean
  type?: 'success' | 'danger' | 'primary' | 'light' | 'info' | 'mute'
  color?: ColorTypes
  m?: '1'
  ml?: '2'
  size?: 'lg' | 'sm'
  onClick?: Function
  outline?: boolean
  testId?: string
  autoFocus?: boolean
  disabled?: boolean
  name?: string
  clickType?: 'submit' | 'reset' | 'button'
  value?: string
  form?: string
  formAction?: string
  formEncType?:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'
  formMethod?: 'post' | 'get'
  formNoValidate?: boolean
  formTarget?: string
}

export const Button: React.FC<ButtonProps> = ({
  m,
  ml,
  type,
  border,
  color = 'black',
  onClick = noop,
  children,
  size,
  outline,
  testId,
  autoFocus,
  disabled,
  name,
  clickType,
  value,
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate,
  formTarget
}) => {
  const classes = ['btn']

  if (border && !outline) classes.push('border')
  if (!border) classes.push(styles.borderless)
  if (type) {
    if (outline) {
      classes.push(
        `btn-outline-${type} ${styles.onFocusBgFix} ${
          styles[`btnOutlineInfoBgFix-${type}`]
        } ${styles[`btn-outline-bg-${type}`]}`
      )
    } else classes.push(`btn-${type}`)
  }
  if (m) classes.push(`m-${m}`)
  if (ml) classes.push(`ms-${ml}`)
  if (size) classes.push(`btn-${size}`)

  return (
    <button
      className={classes.join(' ')}
      onClick={() => onClick()}
      style={{ color: colors[color] }}
      data-testid={testId}
      autoFocus={autoFocus}
      disabled={disabled}
      name={name}
      type={clickType}
      value={value}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
    >
      {children}
    </button>
  )
}
