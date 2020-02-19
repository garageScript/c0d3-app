import React from 'react'

type Props = {
  text: string
  placeholder?: string
  isDisabled?: boolean
  size?: 'small' | 'large'
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputGroup: React.FC<Props> = props => {
  const {
    text,
    placeholder,
    size,
    isDisabled = false,
    onClick,
    onChange
  } = props
  let className = ''
  if (size === 'large') className = 'input-group-lg'
  if (size === 'small') className = 'input-group-sm'

  return (
    <div className={`input-group ${className} col-6`}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        disabled={isDisabled}
        aria-label="email"
        aria-describedby="basic-addon2"
        onChange={onChange}
      />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="button"
          id="button-addon2"
          disabled={isDisabled}
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </div>
  )
}

export default InputGroup
