import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'
import Image from 'next/image'
export enum StatusCode {
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}
type ErrorProps = {
  code: StatusCode
  message?: string
}
const errorTitle: Readonly<{ [key in StatusCode]: string }> = {
  [StatusCode.NOT_FOUND]: 'Page not found',
  [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal server error'
}

const Error: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <Layout title={errorTitle[code]}>
      <div className="container">
        <div className="row">
          <div className="d-flex col-sm-3 align-items-center justify-content-center">
            <div className="text-center mt-3">
              <Text component="div" size="xl" bold={true}>
                {errorTitle[code]}
              </Text>
              <Text size="md">{message}</Text>
              <NavLink path="/" className="btn btn-primary py-3 px-5 mt-3">
                <h3 className="font-weight-bold">Back</h3>
              </NavLink>
            </div>
          </div>
          <div className="mb-3 col-sm-9">
            <Image
              src={`/assets/errors/${code}.svg`}
              layout="responsive"
              width={1200}
              height={1200}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Error
