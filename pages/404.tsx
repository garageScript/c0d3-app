import React from 'react'
import Error from 'next/error'

export default function NotFound() {
  return <Error statusCode={404} />
}
