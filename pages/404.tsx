import React from 'react'
import Error, { StatusCode } from '../components/Error'
export default function NotFound() {
  return <Error code={StatusCode.NOT_FOUND} />
}
