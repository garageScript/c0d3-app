import React from 'react'
import { WithLayout } from '../../@types/page'
import { getLayout } from '../../components/Layout'
import Title from '../../components/Title'
import Card from '../../components/Card'
import NavLink from '../../components/NavLink'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { DiscordUserInfo, getDiscordUserInfo } from '../../helpers/discordAuth'
import { getSession } from 'next-auth/react'
import { Session } from '../../@types/auth'
import { CURRICULUM_PATH, LOGIN_PATH } from '../../constants'

type ConnectToDiscordSuccessProps = {
  errorCode: number
  username: string
  userInfo: DiscordUserInfo
  error: Error
}

type DiscordErrorPageProps = {
  error: Error
  username: string
  errorCode?: ErrorCode
}

type Error = {
  message: string
}

export enum ErrorCode {
  USER_NOT_LOGGED_IN = 1,
  DISCORD_ERROR = 2,
  DIFFERENT_ACCOUNT_IS_CONNECTED = 3
}

const DISCORD_BUGS_FEEDBACK_URL =
  'https://discord.com/channels/828783458469675019/836343487531712512'

const DiscordErrorPage: React.FC<DiscordErrorPageProps> = ({
  username,
  error,
  errorCode
}) => {
  const isDiscordError = errorCode === ErrorCode.DISCORD_ERROR
  const isUserNotLoggedIn = errorCode === ErrorCode.USER_NOT_LOGGED_IN
  const isDiscordAccountUsed =
    errorCode === ErrorCode.DIFFERENT_ACCOUNT_IS_CONNECTED

  let errorMessage = <></>
  let errorLog = <></>
  let navText = isDiscordError ? 'Try Again' : 'Curriculum'
  let navPath = CURRICULUM_PATH

  if (isUserNotLoggedIn) {
    navText = 'Log In Here'
    navPath = LOGIN_PATH

    errorMessage = (
      <>
        <p>You need to be logged in to connect to Discord.</p>
        <p>
          or go straight <NavLink path="/curriculum">to the curriculum</NavLink>{' '}
          without an account
        </p>
      </>
    )
  } else {
    errorMessage = (
      <>
        <p>
          Dear {username}, we had trouble connecting to Discord, please try
          again.
        </p>
      </>
    )
  }

  if (error?.message) {
    errorLog = (
      <>
        <hr />
        <p>Error log</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    )
  }

  if (isDiscordAccountUsed) {
    errorMessage = (
      <>
        <p>
          Sorry, but it looks like the Discord account you are trying to link to
          your C0D3 account is already in use by another account.
        </p>
        <p>
          To fix this, you can either use a different Discord account or, if the
          account you are trying to link is already connected to a different
          C0D3 account, you can go to that account and unlink the Discord
          account. Then, come back to this account and try linking the Discord
          account again.
        </p>
      </>
    )
  }

  return (
    <>
      <Title title="Error" />
      <Card
        title={
          isDiscordAccountUsed ? 'Discord account is already used' : 'Error'
        }
      >
        <div className="mt-3">{errorMessage}</div>
        <p>
          If this problem persists, please ask for help in our{' '}
          <NavLink path={DISCORD_BUGS_FEEDBACK_URL} external>
            Discord channel.
          </NavLink>
        </p>
        <NavLink path={navPath}>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
          >
            {navText}
          </button>
        </NavLink>
        {errorLog}
      </Card>
    </>
  )
}

export const ConnectToDiscordSuccess: React.FC<ConnectToDiscordSuccessProps> &
  WithLayout = ({ errorCode, username, userInfo, error }) => {
  if (errorCode) {
    return (
      <DiscordErrorPage
        username={username}
        error={error}
        errorCode={errorCode}
      />
    )
  }

  return (
    <>
      <Title title="Success!" />
      <Card title="Success!">
        <>
          <div className="ms-auto me-auto">
            <Image
              className="avatar"
              src={userInfo.avatarUrl}
              width={120}
              height={120}
            />
          </div>
          <h5 className="mb-4">
            <Link href={`https://discordapp.com/users/${userInfo.userId}/`}>
              {userInfo.username}
            </Link>
          </h5>
          <style jsx global>{`
            .avatar {
              border-radius: 50%;
            }
          `}</style>
        </>
        <p>{username}, you are now connected to Discord!</p>
        <NavLink path="/curriculum">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
          >
            Continue to Curriculum
          </button>
        </NavLink>
      </Card>
    </>
  )
}

export const getServerSideProps = async ({
  req,
  query
}: GetServerSidePropsContext) => {
  if (query?.error === 'connected') {
    return { props: { errorCode: ErrorCode.DIFFERENT_ACCOUNT_IS_CONNECTED } }
  }

  const { user: sessionUser } = ((await getSession({ req })) as Session) || {}

  if (!sessionUser)
    return { props: { errorCode: ErrorCode.USER_NOT_LOGGED_IN } }

  const prisma = await import('../../prisma')
  const user = await prisma.default.user.findFirst({
    where: {
      id: sessionUser.id
    }
  })

  if (!user) return { props: { errorCode: ErrorCode.USER_NOT_LOGGED_IN } }

  const userInfo = await getDiscordUserInfo(user)

  if (!userInfo.userId) return { props: { errorCode: ErrorCode.DISCORD_ERROR } }

  return { props: { userInfo, username: user.username } }
}

ConnectToDiscordSuccess.getLayout = getLayout

export default ConnectToDiscordSuccess
