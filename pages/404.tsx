import Error from '../components/Error'
import React from 'react'
const NotFound = () => {
  return (
    <Error title="404 error" src="/404.png" message="Page not found"></Error>
  )
}
export default NotFound
