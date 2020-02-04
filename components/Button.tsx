import * as React from 'react'

type Props = {
  text: string
}

const Button = ({ text }: Props) => (
  <button className="btn btn-primary">{text}</button>
)

export default Button
