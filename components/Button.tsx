import * as React from 'react'

type Props = {
  color?: string
  text: string
  initial?: string | undefined
}

const Button = ({ color, initial, text }: Props) => {
  let btnClass
  switch (color) {
    case 'primary':
      btnClass = 'btn-primary'
      break
    case 'secondary':
      btnClass = 'btn-secondary'
      break
    case 'success':
      btnClass = 'btn-success'
      break
    case 'danger':
      btnClass = 'btn-danger'
      break
    case 'warning':
      btnClass = 'btn-warning'
      break
    case 'info':
      btnClass = 'btn-info'
      break
    case 'light':
      btnClass = 'btn-light'
      break
    case 'dark':
      btnClass = 'btn-dark'
      break
    default:
      btnClass = 'border btn-secondary'
      break
  }
  if (!initial) {
    return <button className={`btn ${btnClass}`}>{text}</button>
  } else {
    return (
      <button className={`btn ${btnClass}`}>
        <small className="text-uppercase bg-primary rounded-circle mr-2 text-light p-1">
          {initial}
        </small>
        {text}
      </button>
    )
  }
}

export default Button
