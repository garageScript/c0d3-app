import * as React from 'react'
import ProfileImageInfo from '../../components/ProfileImageInfo'

export default {
  component: ProfileImageInfo,
  title: 'Components/ProfileImageInfo'
}

const user = {
  firstName: 'Rahul',
  lastName: 'Kalra',
  userName: 'noob101'
}

export const _ProfileImageInfo: React.FC = () => (
  <ProfileImageInfo user={user} />
)
