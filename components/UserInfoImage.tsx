import React from 'react'
import { UserInfo } from '../@types/user'
import styles from '../scss/userInfoImage.module.scss'
type UserProps = {
  user: UserInfo
}

const UserInfoImage: React.FC<UserProps> = ({ user }) => {
  return (
    <div
      className={`text-uppercase bg-primary rounded-circle text-light ${styles['user_info_image']}`}
    >
      {user.firstName[0] + user.lastName[0]}
    </div>
  )
}

export default UserInfoImage
