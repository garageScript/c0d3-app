import React from 'react'
import UserInfoImage from './UserInfoImage'
import { UserInfo } from '../pages/profile/[username]'
import Image from 'next/image'
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
      <Image src="/assets/icon.svg" height={40} width={40} />
      <h4 className="text-center text-muted mb-4">{'@' + user.username}</h4>
      <Image src="/assets/discordClydeLogo.svg" height={40} width={40} />
      {/* https://discordapp.com/users/<id>/ */}
      {user.discordUsername ? (
        <h4 className="text-center text-muted mb-4">
          {'@' + user.discordUsername}
        </h4>
      ) : null}
    </div>
  )
}

export default ProfileImageInfo
