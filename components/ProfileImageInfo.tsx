import React from 'react'
import UserInfoImage from './UserInfoImage'
import { UserInfo } from '../@types/user'
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
        className={`ms-auto me-auto mt-4 ${styles['profile_image_container']}`}
      >
        <UserInfoImage user={user} />
      </div>
      <h2 className="text-center mt-2">
        {`${user.firstName} ${user.lastName}`}
      </h2>
      <div className="d-flex justify-content-center">
        <h4 className="text-muted">{'@' + user.username}</h4>
      </div>
      <div className="d-flex ms-auto me-auto mb-4">
        {user.discordUserId ? (
          <>
            <Image
              src="/assets/discordClydeLogo.svg"
              height={20}
              width={20}
              objectFit="contain"
            />
            <h5 className="ms-2">
              <Link
                href={`https://discordapp.com/users/${user.discordUserId}/`}
              >
                {user.discordUsername}
              </Link>
            </h5>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default ProfileImageInfo
