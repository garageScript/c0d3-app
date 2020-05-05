import * as React from 'react'
import ProfileImage from '../../components/ProfileImage'

export default {
  component: ProfileImage,
  title: 'Components/ProfileImage'
}

const user = {
  firstName: 'Rahul',
  lastName: 'Kalra',
  userName: 'noob101'
}

export const _ProfileBravos: React.FC = () => <ProfileImage user={user} />
