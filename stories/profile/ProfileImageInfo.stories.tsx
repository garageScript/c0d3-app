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
  discordUserId: '',
  discordUsername: '',
  discordAvatarUrl: ''
}

export const _ProfileImageInfo: React.FC = () => (
  <ProfileImageInfo user={user} />
)
