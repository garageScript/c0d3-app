import React from 'react'
import ErrorCard, { StatusCode } from '../components/ErrorCard'
export default function NotFound() {
  return <ErrorCard code={StatusCode.NOT_FOUND} />
}
