import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'

type ErrorProps = {
  type: '404' | '500'
  message?: string
}
const Error: React.FC<ErrorProps> = ({ type, message }) => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex col-sm-3 align-items-center justify-content-center">
            <div className="text-center mt-3">
              <Text component="div" size="xl" bold={true}>
                {type === '404' ? 'Page not found' : 'Internal server error'}
              </Text>
              <Text size="md">{message}</Text>
              <NavLink path="/" className="btn btn-primary py-3 px-5 mt-3">
                <h3 className="font-weight-bold">Back</h3>
              </NavLink>
            </div>
          </div>
          <div className="col-sm-9">
            <img
              src={type === '404' ? '/404.png' : '/500.png'}
              className="mb-3 img-fluid"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Error
