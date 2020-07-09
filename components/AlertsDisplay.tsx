import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import { DismissedAlerts } from '../@types/alerts'
import { GetAppQuery } from '../graphql/'
import _ from 'lodash'

type Props = {
  alerts?: GetAppQuery['alerts']
  page?: string
}

const AlertsDisplay: React.FC<Props> = ({ alerts, page }) => {
  const [dismissedAlerts, onDismiss] = useState<DismissedAlerts>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const localDismissedAlerts = localStorage.getItem('dismissedAlerts')
    if (localDismissedAlerts) {
      onDismiss(JSON.parse(localDismissedAlerts))
    }
    setLoading(false)
  }, [])

  const dismissAlert = (id: string) => {
    onDismiss(prevDismissedAlerts => {
      const newDismissedAlerts = { ...prevDismissedAlerts, [id]: true }
      localStorage.setItem(
        'dismissedAlerts',
        JSON.stringify(newDismissedAlerts)
      )
      return newDismissedAlerts
    })
  }

  if (loading) return null

  const widthClass = page === 'curriculum' ? 'col-12' : ''
  return (
    <div className={`alerts-container ${widthClass}`}>
      {_.defaultTo(alerts, [])
        .filter(alert => !dismissedAlerts[_.defaultTo(alert?.id, '-1')])
        .map((alert, i) => (
          <Alert
            key={_.defaultTo(alert?.id, i)}
            alert={alert}
            onDismiss={dismissAlert}
          />
        ))}
    </div>
  )
}

export default AlertsDisplay
