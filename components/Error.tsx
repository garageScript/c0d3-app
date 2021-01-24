import React from 'react'
import Layout from './Layout'
import { Button } from './theme/Button'
import Router from 'next/router'
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
              <Text component="div" size="xl" bold={true}>
                {title}
              </Text>
              <Text size="md">{message}</Text>
              <Button
                color="white"
                size="lg"
                m="1"
                type="primary"
                onClick={() => Router.push('/')}
              >
                Back
              </Button>
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
