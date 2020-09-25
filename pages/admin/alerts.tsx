import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Alert from '../../components/Alert'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { Button } from '../../components/theme/Button'
import REMOVE_ALERT from '../../graphql/queries/removeAlert'
import { withGetApp, GetAppProps, Alert as AlertType } from '../../graphql'
import noop from '../../helpers/noop'
import Card from '../../components/Card'

type CurrentAlertsProps = {
  alerts: AlertType[]
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[] | null>>
}

const CurrentAlerts: React.FC<CurrentAlertsProps> = ({ alerts, setAlerts }) => {
  const [removeAlert] = useMutation(REMOVE_ALERT)

  const removeDatAlert = async (id: string) => {
    try {
      await removeAlert({ variables: { id } })
      const newAlerts = alerts.filter((alert: AlertType) => alert.id !== id)
      setAlerts(newAlerts)
    } catch (err) {
      throw new Error(err)
    }
  }

  const allAlerts = alerts.map((alert: AlertType, key: number) => (
    <div className="row no-gutters" key={key}>
      <div className="d-flex flex-column col-10">
        <Alert alert={alert} onDismiss={noop} />
      </div>
      <div className="d-flex flex-column col-2 mt-3 justify-content-center">
        <Button
          type="danger"
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
  ))

  return (
    <Card classes="col-12" title="Current Alerts">
      <p className="lesson-card__description" style={{ marginTop: -20 }}>
        These alerts are what every students see when they are on their
        dashboard page.
      </p>
      {allAlerts}
    </Card>
  )
}

const Alerts: React.FC<GetAppProps> = ({ data }) => {
  const [alerts, setAlerts] = useState<null | AlertType[]>(null)
  return (
    <AdminLayout data={data}>
      <p className="display-1 text-center text-primary font-weight-bold">
        Alerts
      </p>
      <CurrentAlerts
        alerts={(alerts as AlertType[]) || data.alerts}
        setAlerts={setAlerts}
      />
    </AdminLayout>
  )
}

export default withGetApp()(Alerts)
