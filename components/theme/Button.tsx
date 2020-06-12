import React from 'react'

import { ColorTypes, colors } from './colors'

type ButtonProps = {
  type?: 'success' | 'danger'
  color?: ColorTypes
  m?: '1'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<ButtonProps> = ({
  m,
  type,
  color = 'black',
  onClick = () => {},
  children
}) => {
  const classes = ['btn']

  if (type) classes.push(`bg-${type}`)
  if (m) classes.push(`m-${m}`)

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      style={{ color: colors[color] }}
    >
      {children}
    </button>
  )
}
