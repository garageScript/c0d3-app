import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import { AlertData, DismissedAlerts } from '../@types/alerts'

type Props = {
  alerts: AlertData[]
  page?: string
}

const AlertsDisplay: React.FC<Props> = ({ alerts, page }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<DismissedAlerts>({})
  useEffect(() => {
    const localDismissedAlerts = localStorage.getItem('dismissedAlerts')
    if (localDismissedAlerts) {
      setDismissedAlerts(JSON.parse(localDismissedAlerts))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('dismissedAlerts', JSON.stringify(dismissedAlerts))
  }, [dismissedAlerts])
  const widthClass = page === 'curriculum' ? 'col-12' : ''
  return (
    <div className={`alerts-container ${widthClass}`}>
      {alerts
        .filter(alert => !dismissedAlerts[alert.id as string])
        .map(alert => (
          <Alert
            key={alert.id}
            alert={alert}
            setDismissedAlerts={setDismissedAlerts}
          />
        ))}
    </div>
  )
}

export default AlertsDisplay
