import React from 'react'
import AlreadyLoggedIn from '../../components/AlreadyLoggedIn'
import { MockedProvider } from '@apollo/client/testing'

export default {
  component: AlreadyLoggedIn,
  title: 'Components/AlreadyLoggedIn'
}

export const Basic: React.FC = () => (
  <MockedProvider>
    {' '}
    <AlreadyLoggedIn />{' '}
  </MockedProvider>
)
