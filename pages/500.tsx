import React from 'react'
import Error, { StatusCode } from '../components/Error'

export default function InternalServerError() {
  return <Error code={StatusCode.INTERNAL_SERVER_ERROR} />
}
