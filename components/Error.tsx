import React from 'react'
import Layout from './Layout'
import Navlink from './NavLink'
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
            <div className="text-center">
              <Text size="xl" bold={true}>
                {title}
              </Text>
              <Text size="md">{message}</Text>
              <Navlink path="/" className="btn btn-primary py-3 px-5 mt-3">
                Back
              </Navlink>
            </div>
          </div>
          <div className="col-sm-9">
            <img src={src} alt="" className="mb-3 img-fluid"></img>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Error
