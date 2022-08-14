import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'
import Image from 'next/image'
import styles from '../scss/errorCard.module.scss'

export enum StatusCode {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500
}

type ErrorProps = {
  code: StatusCode
}

const errorTitle: Readonly<{ [key in StatusCode]: string }> = {
  [StatusCode.NOT_FOUND]: 'Page not found',
  [StatusCode.FORBIDDEN]: 'You must be admin to access this page',
  [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal server error'
}

const ErrorCard: React.FC<ErrorProps> = ({ code }) => {
  return (
    <Layout title={errorTitle[code]}>
      <div className={styles.container}>
        <Image src={`/assets/errors/${code}.svg`} height={360} width={360} />
        <div className={styles.container_text_buttons}>
          <h1>{code + ' Error!'}</h1>
          <Text size="lg">{errorTitle[code]}</Text>

          <div className={styles.container_buttons}>
            <NavLink
              path="/curriculum"
              className={
                styles.button + ' btn btn-primary py-2 px-3 mt-3 fw-bold'
              }
            >
              Curriculum
            </NavLink>
            <NavLink
              path="https://github.com/garageScript/c0d3-app"
              className={
                styles.button + ' btn btn-primary py-2 px-3 mt-3 fw-bold'
              }
            >
              Repo
            </NavLink>
            <NavLink
              path="/docs/learn"
              className={
                styles.button + ' btn btn-primary py-2 px-3 mt-3 fw-bold'
              }
            >
              Learn
            </NavLink>
            <NavLink
              path="https://discord.com/invite/c0d3"
              className={
                styles.button + ' btn btn-primary py-2 px-3 mt-3 fw-bold'
              }
            >
              Community
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ErrorCard
