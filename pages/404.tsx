import React from 'react'
import { WithLayout } from '../@types/page'
import Error, { StatusCode } from '../components/Error'
import { getLayout } from '../components/Layout'

const NotFound: React.FC & WithLayout = () => (
  <Error code={StatusCode.NOT_FOUND} message="Page not found" />
)

NotFound.getLayout = getLayout

export default NotFound
