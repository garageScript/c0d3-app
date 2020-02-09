import * as React from 'react'

type Props = {
  color: string
  text: string
  initial?: string | undefined
}

const Button = ({ color, initial, text }: Props) => {
  if (!initial) {
    return (
      <button
        className={`btn ${color === 'primary' ? 'btn-primary' : 'border'}`}
      >
        {text}
      </button>
    )
  } else {
    return (
      <button
        className={`btn ${color === 'primary' ? 'btn-primary' : 'border'}`}
      >
        <small className="text-uppercase bg-primary rounded-circle mr-2 text-light p-1">
          {initial}
        </small>
        {text}
      </button>
    )
  }
}

export default Button
