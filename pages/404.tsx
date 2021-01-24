import React from 'react'
import Error from '../components/Error'

export default function NotFound() {
  return <Error title="404 error" src="/404.png" message="Page not found" />
}
