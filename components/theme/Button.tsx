import React from 'react'
import styles from '../../scss/button.module.scss'

import { ColorTypes, colors } from './colors'
import noop from '../../helpers/noop'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  border?: boolean
  btnType?: 'success' | 'danger' | 'primary' | 'light' | 'info' | 'mute'
  color?: ColorTypes
  m?: '1'
  ml?: '2'
  size?: 'lg' | 'sm'
  outline?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  m,
  ml,
  btnType,
  border,
  color = 'black',
  onClick = noop,
  children,
  size,
  outline,
  ...other
}) => {
  const classes = ['btn']

  if (border && !outline) classes.push('border')
  if (!border) classes.push(styles.borderless)
  if (btnType) {
    if (outline) {
      classes.push(
        `btn-outline-${btnType} ${styles.onFocusBgFix} ${
          styles[`btnOutlineInfoBgFix-${btnType}`]
        } ${styles[`btn-outline-bg-${btnType}`]}`
      )
    } else classes.push(`btn-${btnType}`)
  }
  if (m) classes.push(`m-${m}`)
  if (ml) classes.push(`ms-${ml}`)
  if (size) classes.push(`btn-${size}`)

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      style={{ color: colors[color] }}
      {...other}
    >
      {children}
    </button>
  )
}

type NewButtonProps = {
  className?: string
  onClick: () => void
}

export const NewButton: React.FC<NewButtonProps> = ({
  className = '',
  onClick,
  children
}) => {
  return (
    <button className={`${styles.newButton} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
