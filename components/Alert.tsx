import React from 'react'

type Props = {
  text: string
  instructionsUrl?: string
  icon?: string
  error?: boolean
}

const Alert: React.FC<Props> = props => {
  const alertClasses = props.error ? 'alert-danger' : 'bg-primary text-white'
  return (
    <div className={`alert col-12 mt-4 ${alertClasses}`} role="alert">
      {props.icon && <img className="mr-3" src={`${props.icon}`} />}
      {`${props.text} `}
      {props.instructionsUrl && (
        <a className="text-white" href={`${props.instructionsUrl}`}>
          View Instructions
        </a>
      )}
    </div>
  )
}

export default Alert
