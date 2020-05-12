import * as React from 'react'

export const noop = () => {}

type Props = {
  btnType?: string
  text: string
  initial?: string | null
  onClick?: (event: any) => void
}

const Button: React.FC<Props> = ({
  btnType,
  initial,
  text,
  onClick = noop
}) => {
  const btnClass = btnType
    ? `${btnType}`
    : 'border btn-secondary overflow-hidden text-truncate'
  if (!initial) {
    return (
      <button className={`btn ${btnClass}`} onClick={onClick}>
        {text}
      </button>
    )
  } else {
    return (
      <button
        className={`btn ${btnClass}`}
        style={{ maxWidth: '125px', fontSize: '13px' }}
        onClick={onClick}
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
