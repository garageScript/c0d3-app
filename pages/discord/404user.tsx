import React from 'react'
import Title from '../../components/Title'
import Card from '../../components/Card'
import { getLayout } from '../../components/Layout'
import { WithLayout } from '../../@types/page'
import { Button } from '../../components/theme/Button'
import styles from '../../scss/404user.module.scss'
import { LoggedRequest } from '../../@types/helpers'
import { getUserSession } from '../../helpers/getUserSession'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import { useRouter } from 'next/router'

const User404: React.FC & WithLayout = () => {
  const router = useRouter()

  return (
    <>
      <Title title="404 User!" />
      <Card title="User not found!">
        <p className={styles.card__par}>
          To login with Discord, you will need to have an existing account that
          is connected to discord.
        </p>
        <div className={styles.card__buttons}>
          <Button
            onClick={() => router.push('/login')}
            outline
            btnType="primary"
            border
            color="primary"
            size="lg"
          >
            Login and connect to discord
          </Button>
          <Button
            onClick={() => router.push('/signup')}
            btnType="primary"
            color="white"
            size="lg"
          >
            Create an account and connect to discord
          </Button>
        </div>
      </Card>
    </>
  )
}

User404.getLayout = getLayout

export default User404

// Later it'll be replaced with ProtectedPages Higher Order Function
export const getServerSideProps = async ({
  req,
  res
}: {
  req: LoggedRequest & Request
  res: NextApiResponse & Response
}) => {
  const user = await getUserSession(req, res)

  return user
    ? {
        redirect: {
          permanent: false,
          destination: '/curriculum'
        }
      }
    : { props: {} }
}
