import React from 'react'
import NavLink from './NavLink'

type Props = {
  text: string
  instructionsUrl?: string
  icon?: string
  type: string
  prompt?: string
  setAlertDisplay?: React.Dispatch<React.SetStateAction<boolean>>
}

const Alert: React.FC<Props> = ({
  text,
  instructionsUrl,
  icon,
  type,
  prompt,
  setAlertDisplay
}) => {
  const alertClasses =
    type === 'urgent' ? 'alert-danger' : 'bg-primary text-white'
  return (
    <div
      className={`alert d-flex justify-content-between mt-3 ${alertClasses}`}
      role="alert"
    >
      <div>
        {icon && <img className="mr-3 alert-icon" src={icon} />}
        {text + ' '}
        {instructionsUrl && (
          <NavLink path={instructionsUrl} className="text-white" external>
            View Instructions
          </NavLink>
        )}
      </div>
      {setAlertDisplay && (
        <img
          className={`alert-dismiss alert-dismiss--${type}`}
          data-testid={`dismiss-${type}`}
          src={`/curriculumAssets/icons/dismiss-${type}.svg`}
          onClick={() => {
            localStorage.setItem(prompt as string, JSON.stringify(false))
            setAlertDisplay(false)
          }}
        />
      )}
    </div>
  )
}

export default Alert
