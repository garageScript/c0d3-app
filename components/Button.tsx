import * as React from 'react'

type Props = {
  btnType?: string
  text: string
  initial?: string | null
}

const Button = ({ btnType, initial, text }: Props) => {
  const btnClass = btnType ? `${btnType}` : 'border btn-secondary'
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
