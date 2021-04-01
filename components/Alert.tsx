import React from 'react'
import NavLink from './NavLink'
import { Alert as AlertType } from '../graphql/'
import _ from 'lodash'
import styles from '../scss/alerts.module.scss'

type Props = {
  alert: AlertType
  text?: string
  instructionsUrl?: string
  icon?: string
  type?: string
  prompt?: string
  onDismiss?: (id: number) => void
}

const alertIconMap: { [type: string]: string } = {
  info: '/assets/curriculum/icons/icon-tip.svg',
  urgent: '/assets/curriculum/icons/exclamation.svg'
}

const Alert: React.FC<Props> = ({ alert, onDismiss }) => {
  const { text, type, url, urlCaption, id } = alert
  const icon = alertIconMap[_.defaultTo(type, '-1')]
  const textColor = type === 'urgent' ? 'text-danger' : 'text-white'
  const alertClasses =
    type === 'urgent' ? 'alert-danger' : `bg-primary ${textColor}`
  return (
    <div
      className={`${styles['alert']} d-flex justify-content-between mt-3 ${alertClasses}`}
      role="alert"
    >
      <div>
        {icon && <img className={`mr-3 ${styles['alert-icon']}`} src={icon} />}
        {text + ' '}
        {url && (
          <NavLink path={url} className={textColor} external>
            {urlCaption}
          </NavLink>
        )}
      </div>
      {onDismiss && (
        <button
          role="dismiss"
          className={`${styles['alert-dismiss']}`}
          data-testid={`dismiss-${type}`}
          onClick={() => {
            onDismiss(id)
          }}
        >
          <img src={`/assets/curriculum/icons/dismiss-${type}.svg`} />
        </button>
      )}
    </div>
  )
}

export default Alert
