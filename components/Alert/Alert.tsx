import React from 'react'
import NavLink from '../NavLink'
import { Alert as AlertType } from '../../graphql/'
import _ from 'lodash'
import styles from './alerts.module.scss'
import Image from 'next/image'

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
  const alertClasses =
    type === 'urgent' ? 'alert alert-danger' : `alert alert-primary`
  const imageClass = type === 'urgent' ? '' : styles.info_image

  return (
    <div
      className={`${styles.alert} d-flex justify-content-between mt-3 ${alertClasses}`}
      role="alert"
    >
      <div className="d-flex align-items-center gap-3">
        <div className={imageClass}>
          {icon && <Image src={icon} width={24} height={24} />}
        </div>
        {`${text} `}
        {url && (
          <NavLink path={url} className={'alert-link'} external>
            {urlCaption}
          </NavLink>
        )}
      </div>
      {onDismiss && (
        <button
          role="dismiss"
          className={`${imageClass} ${styles['alert-dismiss']}`}
          data-testid={`dismiss-${type}`}
          onClick={() => onDismiss(id)}
        >
          <Image
            src={`/assets/curriculum/icons/dismiss-${type}.svg`}
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  )
}

export default Alert
