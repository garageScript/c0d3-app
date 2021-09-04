import React from 'react'
import UserInfoImage from './UserInfoImage'
import { UserInfo } from '../pages/profile/[username]'
import Image from 'next/image'
import Link from 'next/link'
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
      <div>
        <Image src="/assets/icon.svg" height={30} width={30} layout="fixed" />
        <h4 className="text-center text-muted mb-4">{'@' + user.username}</h4>
      </div>
      <div>
        <Image src="/assets/discordClydeLogo.svg" height={30} width={30} />
        {user.discordUsername ? (
          <h4 className="text-center text-muted mb-4">
            <Link href={`https://discordapp.com/users/${user.discordUserId}/`}>
              {'@' + user.discordUsername}
            </Link>
          </h4>
        ) : null}
      </div>
    </div>
  )
}

export default ProfileImageInfo
