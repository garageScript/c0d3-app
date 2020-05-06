import React from 'react'
import UserInfoImage from './UserInfoImage'
import { User } from '../@types/user'
import '../scss/profileImageInfo.scss'

type ProfileImageInfoProps = {
  user: User
}

const ProfileImageInfo: React.FC<ProfileImageInfoProps> = props => {
  return (
    <div className="card shadow-sm">
      <div className="profile_image_placeholder text-center">
        <UserInfoImage user={props.user} />
        <h2 className="profile_image_full_name text-center">
          {`${props.user.firstName} ${props.user.lastName}`}
        </h2>
        <h4 className="profile_image_username text-center text-muted">
          {'@' + props.user.userName}
        </h4>
      </div>
    </div>
  )
}

export default ProfileImageInfo
