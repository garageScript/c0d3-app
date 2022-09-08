import { MockedProvider } from '@apollo/client/testing'
import * as React from 'react'
import ProfileImageInfo from '../../components/ProfileImageInfo'

export default {
  component: ProfileImageInfo,
  title: 'Components/ProfileImageInfo'
}

const user = {
  firstName: 'Rahul',
  lastName: 'Kalra',
  username: 'noob101',
  discordUserId: 'fakeDiscordId',
  discordUsername: 'fakeDiscordUsername',
  discordAvatarUrl: 'https://placeimg.com/60/60/any'
}

export const _ProfileImageInfo: React.FC = () => (
  <MockedProvider>
    <ProfileImageInfo user={user} />
  </MockedProvider>
)

export const _ProfileImageInfoWithConnect: React.FC = () => (
  <MockedProvider>
    <ProfileImageInfo user={{ ...user, discordUserId: '' }} />
  </MockedProvider>
)
