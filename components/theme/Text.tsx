import React from 'react'

import { ColorTypes, colors } from './colors'
import { SizeTypes, fontSizes } from './sizes'

type TextProps = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  color?: ColorTypes
  size?: SizeTypes
  bold?: boolean
}

export const Text: React.FC<TextProps> = ({
  component = 'div',
  color = 'black',
  size = 'md',
  children,
  bold
}) => {
  const Component = component

  return (
    <Component style={{ color: colors[color], fontSize: fontSizes[size] }}>
      {bold ? <strong>{children}</strong> : children}
    </Component>
  )
}
