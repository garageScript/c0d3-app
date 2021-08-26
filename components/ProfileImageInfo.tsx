import React from 'react'
import UserInfoImage from './UserInfoImage'
import { UserInfo } from '../@types/user'
import styles from '../scss/profileImageInfo.module.scss'

type ProfileImageInfoProps = {
  user: UserInfo
}

const ProfileImageInfo: React.FC<ProfileImageInfoProps> = ({ user }) => {
  return (
    <div className="card shadow-sm">
      <div
        className={`ml-auto mr-auto mt-4 ${styles['profile_image_container']}`}
      >
        <UserInfoImage user={user} />
      </div>
      <h2 className="text-center mt-4">
        {`${user.firstName} ${user.lastName}`}
      </h2>
      <h4 className="text-center text-muted mb-4">{'@' + user.username}</h4>
    </div>
  )
}

export default ProfileImageInfo
