import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'
type ErrorProps = {
  title: string
  src: string
  message?: string
}
const Error: React.FC<ErrorProps> = ({ title, message, src }) => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex col-sm-3 align-items-center justify-content-center">
            <div className="text-center mt-3">
              <Text component="div" size="xl" bold={true}>
                {title}
              </Text>
              <Text size="md">{message}</Text>
              <NavLink path="/" className="btn btn-primary py-3 px-5 mt-3">
                <h3 className="font-weight-bold">Back</h3>
              </NavLink>
            </div>
          </div>
          <div className="col-sm-9">
            <img src={src} className="mb-3 img-fluid" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Error
