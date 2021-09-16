import * as React from 'react'
import UserInfoImage from '../../components/UserInfoImage'
import { UserInfo } from '../../@types/user'

export default {
  component: UserInfoImage,
  title: 'Components/UserInfoImage'
}

const user: UserInfo = {
  username: '',
  firstName: 'Rahul',
  lastName: 'Kalra',
  discordUserId: '123',
  discordUsername: 'discordUser',
  discordAvatarUrl: 'avatarUrl'
}

export const _UserInfoImage: React.FC = () => {
  return (
    <div
      style={{
        width: '50px',
        height: '50px'
      }}
    >
      <UserInfoImage user={user} />
    </div>
  )
}
