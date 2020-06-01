import React from 'react'
import NavLink from './NavLink'
import { AlertData, DismissedAlerts } from '../@types/alerts'

type Props = {
  alert: AlertData
  text?: string
  instructionsUrl?: string
  icon?: string
  type?: string
  prompt?: string
  setDismissedAlerts?: React.Dispatch<React.SetStateAction<DismissedAlerts>>
}

const Alert: React.FC<Props> = ({ alert, setDismissedAlerts }) => {
  const alertIconMap: { [type: string]: string } = {
    info: '/curriculumAssets/icons/icon-tip.svg',
    urgent: '/curriculumAssets/icons/exclamation.svg'
  }
  const { text, type, url, urlCaption, id } = alert
  const icon = alertIconMap[type]
  const textColor = type === 'urgent' ? 'text-danger' : 'text-white'
  const alertClasses =
    type === 'urgent' ? 'alert-danger' : `bg-primary ${textColor}`
  return (
    <div
      className={`alert d-flex justify-content-between mt-3 ${alertClasses}`}
      role="alert"
    >
      <div>
        {icon && <img className="mr-3 alert-icon" src={icon} />}
        {text + ' '}
        {url && (
          <NavLink path={url} className={textColor} external>
            {urlCaption}
          </NavLink>
        )}
      </div>
      {id && setDismissedAlerts && (
        <button
          role="dismiss"
          className="alert-dismiss"
          data-testid={`dismiss-${type}`}
          onClick={() => {
            setDismissedAlerts(dismissedAlerts => ({
              ...dismissedAlerts,
              [id]: true
            }))
          }}
        >
          <img src={`/curriculumAssets/icons/dismiss-${type}.svg`} />
        </button>
      )}
    </div>
  )
}

export default Alert
