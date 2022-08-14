import React from 'react'
import ErrorCard, { StatusCode } from '../components/ErrorCard'

export default function InternalServerError() {
  return <ErrorCard code={StatusCode.INTERNAL_SERVER_ERROR} />
}
