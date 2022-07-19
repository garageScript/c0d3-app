import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import * as Sentry from '@sentry/browser'
import Alert from '../../Alert'
import { FormCard } from '../../../components/FormCard'
import ADD_ALERT from '../../../graphql/queries/addAlert'
import { Alert as AlertType } from '../../../graphql'
import noop from '../../../helpers/noop'
import { alertValidation } from '../../../helpers/formValidation'
import { formChange } from '../../../helpers/formChange'
import {
  errorCheckAllFields,
  getPropertyArr,
  makeGraphqlVariable
} from '../../../helpers/admin/adminHelpers'

type NewAlertProps = {
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
}

const newAlertAttributes = {
  text: '',
  type: [
    { title: 'info', as: 'button' },
    { title: 'urgent', as: 'button' }
  ],
  url: '',
  urlCaption: ''
}

export const NewAlert: React.FC<NewAlertProps> = ({ setAlerts }) => {
  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      alertProperties,
      setAlertProperties,
      alertValidation
    )
  }

  const blankValuesForm = getPropertyArr(
    { ...newAlertAttributes },
    undefined,
    handleChange
  )

  const [createAlert, { loading, data }] = useMutation(ADD_ALERT)
  const [alertProperties, setAlertProperties] = useState(blankValuesForm)

  // when data is fully loaded after sending mutation request, update front-end alerts info
  useEffect(() => {
    if (!loading && data) {
      setAlerts(data.addAlert)
      setAlertProperties(blankValuesForm)
    }
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async () => {
    const newProperties = [...alertProperties]
    const valid = await errorCheckAllFields(newProperties, alertValidation)
    if (!valid) {
      setAlertProperties(newProperties)
      return
    }
    try {
      await createAlert(makeGraphqlVariable(newProperties))
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  return (
    <div className="row mb-4">
      <div className="col-8 offset-2">
        <div className="mb-3">
          <Alert
            alert={{
              id: '-1',
              ...makeGraphqlVariable(alertProperties).variables
            }}
            onDismiss={noop}
          />
        </div>
        <div className="text-start">
          <FormCard
            values={alertProperties}
            onSubmit={{ title: 'Create New Alert', onClick: alter }}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
