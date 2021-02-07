import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'
export enum StatusCode {
  NOT_FOUND = '404',
  INTERNAL_SERVER_ERROR = '500'
}
type ErrorProps = {
  code: StatusCode
  message?: string
}
const Error: React.FC<ErrorProps> = ({ code, message }) => {
  const errorMessages: ReadonlyMap<StatusCode, string> = new Map([
    [StatusCode.NOT_FOUND, 'Page not found'],
    [StatusCode.INTERNAL_SERVER_ERROR, 'Internal server error']
  ])
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex col-sm-3 align-items-center justify-content-center">
            <div className="text-center mt-3">
              <Text component="div" size="xl" bold={true}>
                {errorMessages.get(code)}
              </Text>
              <Text size="md">{message}</Text>
              <NavLink path="/" className="btn btn-primary py-3 px-5 mt-3">
                <h3 className="font-weight-bold">Back</h3>
              </NavLink>
            </div>
          </div>
          <div className="col-sm-9">
            <img src={`/${code}.png`} className="mb-3 img-fluid" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Error
