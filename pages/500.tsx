import React from 'react'
import { WithLayout } from '../@types/page'
import Error, { StatusCode } from '../components/Error'
import { getLayout } from '../components/Layout'

const InternalServerError: React.FC & WithLayout = () => (
  <Error code={StatusCode.INTERNAL_SERVER_ERROR} />
)

InternalServerError.getLayout = getLayout

export default InternalServerError
