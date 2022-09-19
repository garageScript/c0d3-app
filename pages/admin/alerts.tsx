import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Alert from '../../components/Alert'
import * as Sentry from '@sentry/browser'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { Button } from '../../components/theme/Button'
import REMOVE_ALERT from '../../graphql/queries/removeAlert'
import { withGetApp, GetAppProps, Alert as AlertType } from '../../graphql'
import noop from '../../helpers/noop'
import Card from '../../components/Card'
import { NewAlert } from '../../components/admin/alerts/AdminNewAlert'

type AlertRowProps = {
  alerts: AlertType[]
  alert: AlertType
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
}

const AlertRow: React.FC<AlertRowProps> = ({ alerts, alert, setAlerts }) => {
  const [removeAlert] = useMutation(REMOVE_ALERT)

  const removeDatAlert = async (id: number) => {
    try {
      await removeAlert({ variables: { id } })
      const newAlerts = alerts.filter((alert: AlertType) => alert.id !== id)
      setAlerts(newAlerts)
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  return (
    <div className="row">
      <div className="d-flex flex-column col-10">
        <Alert alert={alert} onDismiss={noop} />
      </div>
      <div className="d-flex flex-column col-2 mt-3 justify-content-center">
        <Button
          btnType="danger"
          onClick={() =>
            confirm('Are you sure you want to delete this alert?') &&
            removeDatAlert(alert.id)
          }
          color="white"
        >
          Remove Alert
        </Button>
      </div>
    </div>
  )
}

const Alerts: React.FC<GetAppProps> = ({ data }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([])

  // useEffect needed to update `alerts` state after data has finished loading alerts
  // if this is not done, no alerts will be displayed because alerts will just equal []
  useEffect(() => {
    !data.error && !data.loading && setAlerts(data.alerts as AlertType[])
  }, [data])

  const currentAlerts = alerts.map((alert: AlertType, key: number) => (
    <AlertRow alerts={alerts} alert={alert} key={key} setAlerts={setAlerts} />
  ))

  return (
    <AdminLayout data={data} title="Admin alerts">
      <Card
        primary={true}
        title="Alerts"
        classes="col-12"
        text="Add new messages you want c0d3.com students to see or remove old and outdated alerts!"
      />
      <Card
        primary={true}
        title="Create New Alert"
        classes="col-12"
        text="Make a new alert. Look at the preview to see if the alert looks and functions how you want it to!"
      >
        <NewAlert setAlerts={setAlerts} />
      </Card>
      <Card
        primary={true}
        title="Current Alerts"
        classes="col-12"
        text="These alerts are what every students see when they are on their
        dashboard page."
      >
        {currentAlerts}
      </Card>
    </AdminLayout>
  )
}

export default withGetApp()(Alerts)
