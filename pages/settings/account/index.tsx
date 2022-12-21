import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { FormCard, Option } from '../../../components/FormCard'
import { formChange } from '../../../helpers/formChange'
import { useGetAppQuery } from '../../../graphql/index'
import LoadingSpinner from '../../../components/LoadingSpinner'
import styles from '../../../scss/accountSettings.module.scss'

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

  useEffect(() => {
    setOptions(values(username, firstName, lastName))
  }, [data])

  if (loading || !data) {
    return <LoadingSpinner />
  }

  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container__child}>
          <h1>Settings</h1>
          <hr />
          <FormCard
            title="Basics"
            onChange={onChange}
            values={options}
            onSubmit={{
              title: 'Save Changes',
              onClick: () => {}
            }}
            noBg
            newBtn
          />
        </div>
      </div>
    </Layout>
  )
}

export default AccountSettings
