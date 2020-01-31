import * as React from 'react'
import './styles/NavButton.css'

type Props = {
  children: string
  style?: string
}

const Button = ({ children, style }: Props) => {
  const btnClasses = style === 'dark' ? 'primary' : 'secondary'
  return <button className={` navBtn ${btnClasses}`}>{children}</button>
}

export default Button
