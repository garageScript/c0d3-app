import React, { useState } from 'react'
import NavLink from '../NavLink'
import { Alert as AlertType } from '../../graphql/'
import _ from 'lodash'
import styles from './alerts.module.scss'
import Image from 'next/image'
import { Alert as AlertBS } from 'react-bootstrap'

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
  const [show, setShow] = useState(true)

  const { text, type, url, urlCaption, id } = alert
  const icon = alertIconMap[_.defaultTo(type, '-1')]
  const imageClass = type === 'urgent' ? '' : styles.info_image

  return show ? (
    <AlertBS
      variant={`${type === 'urgent' ? 'danger' : 'primary'}`}
      onClose={() => {
        setShow(false)
        onDismiss && onDismiss(id)
      }}
      dismissible={!!onDismiss}
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
    </AlertBS>
  ) : (
    <></>
  )
}

export default Alert
