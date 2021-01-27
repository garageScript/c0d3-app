import * as React from 'react'
import Error from '../../components/Error'
import { MockedProvider } from '@apollo/react-testing'

export default {
  components: Error,
  title: 'Components/Error'
}

export const NotFound: React.FC = () => {
  return (
    <MockedProvider addTypename={false}>
      <Error title="Page not found" src="/404.png" message="404 error"></Error>
    </MockedProvider>
  )
}

export const Internal: React.FC = () => {
  return (
    <MockedProvider addTypename={false}>
      <Error
        title="Internal server error"
        message="No data"
        src="/500.png"
      ></Error>
    </MockedProvider>
  )
}
