import React from 'react'
import Error from '../components/Error'

export default function NotFound() {
  return <Error title="Internal server error" src="/500.png" />
}
