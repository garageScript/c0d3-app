import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import { AlertData, DismissedAlerts } from '../@types/alerts'

type Props = {
  alerts: AlertData[]
  page?: string
}

const AlertsDisplay: React.FC<Props> = ({ alerts, page }) => {
  const [dismissedAlerts, onDismiss] = useState<DismissedAlerts>({})
  useEffect(() => {
    const localDismissedAlerts = localStorage.getItem('dismissedAlerts')
    if (localDismissedAlerts) {
      onDismiss(JSON.parse(localDismissedAlerts))
    }
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

  const widthClass = page === 'curriculum' ? 'col-12' : ''
  return (
    <div className={`alerts-container ${widthClass}`}>
      {alerts
        .filter(alert => !dismissedAlerts[alert.id as string])
        .map(alert => (
          <Alert key={alert.id} alert={alert} onDismiss={dismissAlert} />
        ))}
    </div>
  )
}

export default AlertsDisplay
