import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { FormCard, Option } from '../../../components/FormCard'
import { formChange } from '../../../helpers/formChange'
import {
  UpdateUserNamesMutation,
  useGetAppQuery,
  useUpdateUserNamesMutation
} from '../../../graphql/index'
import LoadingSpinner from '../../../components/LoadingSpinner'
import styles from '../../../scss/accountSettings.module.scss'
import { errorCheckAllFields } from '../../../helpers/admin/adminHelpers'
import { userNamesValidation } from '../../../helpers/formValidation'
import { ApolloError } from '@apollo/client'
import QueryInfo from '../../../components/QueryInfo'
import * as Sentry from '@sentry/browser'

type BasicSettingsProps = {
  updateUserNamesData?: UpdateUserNamesMutation | null
  updateUserNamesLoading: boolean
  error?: ApolloError
  onChange: (value: string, index: number) => void
  options: Option[]
  onClick: () => Promise<void>
}

const BasicSettings = ({
  updateUserNamesData,
  updateUserNamesLoading,
  error,
  onChange,
  options,
  onClick
}: BasicSettingsProps) => {
  return (
    <>
      <QueryInfo
        data={updateUserNamesData}
        loading={updateUserNamesLoading}
        error={error?.message || ''}
        texts={{
          loading: 'Updating your names...',
          data: `Updated your names successfully!`,
          error: error?.message
        }}
        dismiss={{
          onDismissData: () => {},
          onDismissError: () => {}
        }}
      />
      <FormCard
        title="Basics"
        onChange={onChange}
        values={options}
        onSubmit={{
          title: 'Save Changes',
          onClick
        }}
        noBg
        newBtn
      />
    </>
  )
}

const values: (
  username?: string,
  firstName?: string,
  lastName?: string
) => Option[] = (username, firstName, lastName) => [
  { title: 'username', value: username || '' },
  { title: 'first name', value: firstName },
  { title: 'last name', value: lastName }
]
const AccountSettings = () => {
  const { data, loading } = useGetAppQuery()
  const { username, name } = data?.session.user || {}
  const [firstName, lastName] = name?.split(' ') || []

  const [options, setOptions] = useState(values(username, firstName, lastName))
  const [
    updateUserNames,
    { data: updateUserNamesData, error, loading: updateUserNamesLoading }
  ] = useUpdateUserNamesMutation()

  useEffect(() => {
    setOptions(values(username, firstName, lastName))
  }, [data])

  if (loading || !data) {
    return <LoadingSpinner />
  }

  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions, userNamesValidation)
  }

  const onClick = async () => {
    try {
      const newProperties = [...options]
      const valid = await errorCheckAllFields(
        newProperties,
        userNamesValidation
      )

      if (!valid) {
        // Update the forms so the error messages appear
        setOptions(newProperties)
        return
      }

      await updateUserNames({
        variables: {
          username: options[0].value as string,
          name: `${options[1].value} ${options[2].value}`
        }
      })
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container__child}>
          <h1>Settings</h1>
          <hr />
          <BasicSettings
            updateUserNamesData={updateUserNamesData}
            updateUserNamesLoading={updateUserNamesLoading}
            error={error}
            onChange={onChange}
            options={options}
            onClick={onClick}
          />
        </div>
      </div>
    </Layout>
  )
}

export default AccountSettings
