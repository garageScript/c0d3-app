import React from 'react'
import NavLink from './NavLink'
import { Alert as AlertType } from '../graphql/'
import _ from 'lodash'
import '../scss/alerts.scss'

type Props = {
  alert: AlertType
  text?: string
  instructionsUrl?: string
  icon?: string
  type?: string
  prompt?: string
  onDismiss?: (id: string) => void
}

const alertIconMap: { [type: string]: string } = {
  info: '/curriculumAssets/icons/icon-tip.svg',
  urgent: '/curriculumAssets/icons/exclamation.svg'
}

const Alert: React.FC<Props> = ({ alert, onDismiss }) => {
  const { text, type, url, urlCaption, id } = alert
  const icon = alertIconMap[_.defaultTo(type, '-1')]
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
      {id && onDismiss && (
        <button
          role="dismiss"
          className="alert-dismiss"
          data-testid={`dismiss-${type}`}
          onClick={() => {
            onDismiss(id)
          }}
        >
          <img src={`/curriculumAssets/icons/dismiss-${type}.svg`} />
        </button>
      )}
    </div>
  )
}

export default Alert
