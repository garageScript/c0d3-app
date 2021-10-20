import React from 'react'
import { WithLayout } from '../../@types/page'
import { getLayout } from '../../components/Layout'
import Title from '../../components/Title'
import Card from '../../components/Card'
import NavLink from '../../components/NavLink'
import { NextApiResponse } from 'next'
import loggingMiddleware from '../../helpers/middleware/logger'
import sessionMiddleware from '../../helpers/middleware/session'
import userMiddleware from '../../helpers/middleware/user'
import { LoggedRequest } from '../../@types/helpers'

import {
  DiscordUserInfo,
  setTokenFromAuthCode,
  getDiscordUserInfo
} from '../../helpers/discordAuth'

type ConnectToDiscordSuccessProps = {
  errorCode: number
  username: string
  userInfo: DiscordUserInfo
  error: Error
}

type DiscordErrorPageProps = {
  error: Error
  username: string
}

type Error = {
  message: string
}

export const USER_NOT_LOGGED_IN = 1
export const DISCORD_ERROR = 2
const DISCORD_BUGS_FEEDBACK_URL =
  'https://discord.com/channels/828783458469675019/836343487531712512'

const UserNotLoggedInErrorPage = () => {
  return (
    <>
      <Title title="Error" />
      <Card title="Error">
        <div className="mt-3">
          <p>You need to be logged in to connect to Discord.</p>
          <p>
            If this problem persists, please ask for help in our{' '}
            <NavLink path={DISCORD_BUGS_FEEDBACK_URL} external>
              Discord channel.
            </NavLink>
          </p>
        </div>
        <NavLink path="/login">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
          >
            Log In Here
          </button>
        </NavLink>
        <p>
          or go straight <NavLink path="/curriculum">to the curriculum</NavLink>{' '}
          without an account
        </p>
      </Card>
    </>
  )
}

const DiscordErrorPage: React.FC<DiscordErrorPageProps> = ({
  username,
  error
}) => {
  let errorSection = <></>
  if (error.message) {
    errorSection = (
      <>
        <hr />
        <p>Error log</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    )
  }
  return (
    <>
      <Title title="Error" />
      <Card title="Error">
        <div className="mt-3">
          <p>
            Dear {username}, we had trouble connecting to Discord, please try
            again.
          </p>
          <p>
            If this problem persists, please ask for help in our{' '}
            <NavLink path={DISCORD_BUGS_FEEDBACK_URL} external>
              Discord channel.
            </NavLink>
          </p>
        </div>
        <NavLink path="/curriculum">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
          >
            Try Again
          </button>
        </NavLink>
        {errorSection}
      </Card>
    </>
  )
}

const ConnectToDiscordSuccess: React.FC<ConnectToDiscordSuccessProps> &
  WithLayout = ({ errorCode, username, userInfo, error }) => {
  if (errorCode === DISCORD_ERROR)
    return <DiscordErrorPage username={username} error={error} />
  if (errorCode === USER_NOT_LOGGED_IN) return <UserNotLoggedInErrorPage />
  return (
    <>
      <Title title="Success!" />
      <Card title="Success!">
        <div className="mt-3">
          <p>{JSON.stringify(username)}, You are now connected to Discord!</p>
          <p>{JSON.stringify(userInfo)}</p>
        </div>
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

type Query = {
  code: string
}

export const getServerSideProps = ({
  req,
  res,
  query
}: {
  // request is initially of type NextApiRequest until it goes through all the middlewares
  req: LoggedRequest
  res: NextApiResponse
  query?: Query
}) => {
  return new Promise(resolve => {
    loggingMiddleware(req, res, () => {
      // request type we are using (which is based on NextJS request)
      // is different from request type that express-session is using
      sessionMiddleware()(req as any, res as any, () => {
        userMiddleware(req, res, async () => {
          if (!req.user?.id) {
            return resolve({ props: { errorCode: USER_NOT_LOGGED_IN } })
          }
          try {
            const { code } = query || {}
            const user = await setTokenFromAuthCode(req.user.id, code as string)
            const userInfo = await getDiscordUserInfo(user)
            if (!userInfo.username) {
              return resolve({
                props: {
                  error: '',
                  errorCode: DISCORD_ERROR,
                  username: req.user.username
                }
              })
            }
            resolve({ props: { userInfo, username: req.user.username } })
          } catch (error: any) {
            resolve({
              props: {
                error: error.message,
                errorCode: DISCORD_ERROR, // auth code expired
                username: req.user.username
              }
            })
          }
        })
      })
    })
  })
}

ConnectToDiscordSuccess.getLayout = getLayout

export default ConnectToDiscordSuccess
