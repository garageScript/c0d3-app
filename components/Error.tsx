import React from 'react'
import Layout from './Layout'
import NavLink from './NavLink'
import { Text } from './theme/Text'
import Image from 'next/image'
export enum StatusCode {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500
}
type ErrorProps = {
  code: StatusCode
  message?: string
}
const errorTitle: Readonly<{ [key in StatusCode]: string }> = {
  [StatusCode.NOT_FOUND]: '404',
  [StatusCode.INTERNAL_SERVER_ERROR]: '500',
  [StatusCode.FORBIDDEN]: '403'
}

const Error: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <Layout title={errorTitle[code]}>
      <div className="container pt-5">
        <div className="row">
          <div className="d-flex align-items-center justify-content-center">
            <Image
              src={`/assets/errors/${code}.svg`}
              layout="fixed"
              width={500}
              height={200}
              objectFit="contain"
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <Text size="xl" bold={true} component="div">
                {errorTitle[code]}
              </Text>
              <div className="pb-4 ">
                <Text size="md" bold={true}>
                  {message}
                </Text>
              </div>

              <div className="mb-4 ">
                <NavLink path="/curriculum" className="px-3 pt-2">
                  Curriculum
                </NavLink>
                <span className="pt-2 opacity-50">|</span>
                <NavLink
                  path="https://github.com/garageScript/c0d3-app"
                  className="px-3 pt-2"
                >
                  Repo
                </NavLink>
                <span className="pt-2 opacity-50">|</span>
                <NavLink path="https://discord.gg/c0d3" className="px-3 pt-2">
                  Community
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Error
