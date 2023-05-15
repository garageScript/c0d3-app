import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { FormCard, Option } from '../../../components/FormCard'
import { formChange } from '../../../helpers/formChange'
import {
  GetAppQuery,
  useUnlinkDiscordMutation,
  useUpdateUserNamesMutation,
  useUpdateUserPasswordMutation,
  useUserInfoLazyQuery
} from '../../../graphql/index'
import LoadingSpinner from '../../../components/LoadingSpinner'
import styles from '../../../scss/accountSettings.module.scss'
import { errorCheckAllFields } from '../../../helpers/admin/adminHelpers'
import {
  userNamesValidation,
  passwordsValidation
} from '../../../helpers/formValidation'
import QueryInfo from '../../../components/QueryInfo'
import * as Sentry from '@sentry/browser'
import { Button } from '../../../components/theme/Button'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { SessionContext } from '../../../@types/auth'
import { SessionStatus } from '../../../constants/auth-constants'
import { useRouter } from 'next/router'
import redirectUnauthenticated from '../../../helpers/redirectUnauthenticated'
import { ErrorMsg } from '../../../constants/error-messages'

const basicValues: (
  username?: string,
  firstName?: string,
  lastName?: string
) => Option[] = (username, firstName, lastName) => [
  { title: 'username', value: username },
  { title: 'first name', value: firstName },
  { title: 'last name', value: lastName }
]

type BasicSettingsProps = {
  username?: string
  name?: string
  getAppData?: GetAppQuery
}
const BasicSettings = ({
  username,
  name = '',
  getAppData
}: BasicSettingsProps) => {
  const [firstName, lastName] = name.split(' ')

  const [options, setOptions] = useState(
    basicValues(username, firstName, lastName)
  )
  const [
    updateUserNames,
    { data: updateUserNamesData, error, loading: updateUserNamesLoading }
  ] = useUpdateUserNamesMutation()

  useEffect(() => {
    setOptions(basicValues(username, firstName, lastName))
  }, [getAppData])

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
    <>
      <QueryInfo
        data={updateUserNamesData}
        loading={updateUserNamesLoading}
        error={error?.message || ''}
        texts={{
          loading: 'Updating your names...',
          data: 'Updated your names successfully!',
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

const passwordValues: () => Option[] = () => [
  { title: 'current password', value: '', valueType: 'password' },
  { title: 'new password', value: '', valueType: 'password' },
  { title: 'new password again', value: '', valueType: 'password' }
]
const PasswordSettings = () => {
  const [options, setOptions] = useState(passwordValues())
  const [currentPassword, newPassword, newPasswordAgain] = options
  const [updateUserPassword, { data, loading, error }] =
    useUpdateUserPasswordMutation()

  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions, passwordsValidation)
  }

  const onClick = async () => {
    try {
      const newProperties = [...options]
      const valid = await errorCheckAllFields(
        newProperties,
        passwordsValidation
      )

      if (!valid) {
        // Update the forms so the error messages appear
        setOptions(newProperties)
        return
      }

      await updateUserPassword({
        variables: {
          newPassword: newPassword.value as string,
          currentPassword: currentPassword.value as string,
          newPasswordAgain: newPasswordAgain.value as string
        }
      })
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  return (
    <>
      <QueryInfo
        data={data}
        loading={loading}
        error={error?.message || ''}
        texts={{
          loading: 'Updating your password...',
          data: 'Updated your password successfully!',
          error: error?.message
        }}
        dismiss={{
          onDismissData: () => {},
          onDismissError: () => {}
        }}
      />
      <FormCard
        title="Password"
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

const LinkedAccountsSetting = ({
  discordUsername
}: {
  discordUsername: string | undefined
}) => {
  const router = useRouter()
  const [unlinkDiscordMutation, { data, loading, error }] =
    useUnlinkDiscordMutation()

  const unlinkDiscord = async () => {
    try {
      await unlinkDiscordMutation()
      router.reload()
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <div>
      <h3 className="mb-4">Linked accounts</h3>
      <QueryInfo
        loading={loading}
        data={data}
        error={error?.message || ''}
        texts={{
          data: 'Unlinked Discord successfully',
          loading: 'Unlinking Discord...',
          error: 'Oops, we could not Unlink Discord. Please try again'
        }}
      />
      <div className={styles.linkedAccounts__container}>
        <div className={styles.linkedAccounts__container__item}>
          <div className={styles.linkedAccounts__container__item__icon}>
            <div>
              <Image
                src="/assets/discordClydeLogo.svg"
                height={17}
                width={22}
              />
            </div>
            <span className="fs-5">Discord</span>
          </div>
          {discordUsername ? (
            <div className={styles.linkedAccounts__container__item__icon}>
              <span>{discordUsername}</span>
              <Button
                data-testid="unlink-discord"
                btnType="danger"
                color="danger"
                outline
                onClick={unlinkDiscord}
              >
                Unlink Discord
              </Button>
            </div>
          ) : (
            <Button
              data-testid="connect-to-discord"
              btnType="primary"
              color="white"
              onClick={() =>
                signIn('discord', { callbackUrl: '/discord/success' })
              }
            >
              Connect to discord
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const AccountSettings = () => {
  const { data: session, status } = useSession() as SessionContext
  const [userInfoQuery, { data, loading: userInfoLoading, error }] =
    useUserInfoLazyQuery()

  const loading = userInfoLoading || status === SessionStatus.Loading
  const authenticated = status === SessionStatus.Authenticated
  const unauthenticated = status === SessionStatus.Unauthenticated
  const { username, name, discordUsername } = data?.userInfo?.user || {}

  redirectUnauthenticated(unauthenticated)

  useEffect(() => {
    if (authenticated && session) {
      userInfoQuery({
        variables: {
          username: session.user.username
        }
      })
    }
  }, [status])

  // prevents the page UI from showing if unauthenticated
  if (loading || unauthenticated) {
    return <LoadingSpinner />
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container__child}>
          <h1>Settings</h1>
          <QueryInfo
            data={null}
            loading={false}
            error={error?.message || ''}
            texts={{
              loading: '',
              data: '',
              error: ErrorMsg.RetrieveInfo
            }}
          />
          <hr className="mb-4" />
          <div className={styles.container__sections}>
            <BasicSettings username={username} name={name} />
            <hr className="mt-4 mb-4" />
            <PasswordSettings />
            <hr className="mt-4 mb-4" />
            <LinkedAccountsSetting discordUsername={discordUsername} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AccountSettings
