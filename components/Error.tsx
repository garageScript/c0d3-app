import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'
import Image from 'next/image'
import styles from '../scss/error.module.scss'
import { CURRICULUM_PATH, DOCS_PATH } from '../constants'

export enum StatusCode {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500
}

type ErrorProps = {
  code: StatusCode
  message?: string | undefined
}

const errorTitle: Readonly<{ [key in StatusCode]: string }> = {
  [StatusCode.NOT_FOUND]: 'Page not found',
  [StatusCode.FORBIDDEN]: 'You must be admin to access this page',
  [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal server error'
}

const Error: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <Layout title={errorTitle[code]}>
      <div className={styles.container}>
        <Image src={`/assets/errors/${code}.svg`} height={360} width={360} />
        <div className={styles.container_text_buttons}>
          <h1>{code + ' Error!'}</h1>
          <Text size="lg">{message ? message : errorTitle[code]}</Text>

          <div className={styles.container_buttons}>
            <NavLink
              path={CURRICULUM_PATH}
              className={
                styles.button + ' btn btn-primary py-2 px-3 mt-3 fw-bold'
              }
            >
              Home
            </NavLink>
            <NavLink
              path={DOCS_PATH + '/learn'}
              className={
                styles.button + ' btn btn-primary py-2 px-3 mt-3 fw-bold'
              }
            >
              Learn
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Error
