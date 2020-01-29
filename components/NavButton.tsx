import * as React from 'react'
import './styles/NavButton.css'

type Props = {
  children: string
  style?: string
}

const Button = ({ children, style }: Props) => {
  const btnClasses = style === 'dark' ? 'dark' : 'light'
  return (
    <button className={`py-2 px-8 mx-4 rounded-lg ${btnClasses}`}>
      {children}
    </button>
  )
}

export default Button
