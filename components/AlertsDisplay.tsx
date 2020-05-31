import React from 'react'
import Alert from './Alert'
import { AlertData } from '../@types/alerts'

type Props = {
  alerts: AlertData[]
  dismissedAlerts: { [id: string]: boolean }
  setDismissedAlerts: React.Dispatch<React.SetStateAction<{}>>
  page?: string
}

const AlertsDisplay: React.FC<Props> = ({
  alerts,
  dismissedAlerts,
  setDismissedAlerts,
  page
}) => {
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
