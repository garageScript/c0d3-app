import React from 'react'
import styles from '../scss/profileImageInfo.module.scss'
import Image from 'next/image'

type ProfileDiscordInfoProps = {
  username: string
  avatar: string
}

const ProfileDiscordInfo: React.FC<ProfileDiscordInfoProps> = ({
  username,
  avatar
}) => {
  return (
    <div className="card shadow-sm">
      <h3>Discord</h3>
      <div
        className={`ml-auto mr-auto mt-4 ${styles['profile_image_container']}`}
      >
        <Image src={avatar} />
      </div>
      <h2 className="text-center mt-4">{'@' + username}</h2>
    </div>
  )
}

export default ProfileDiscordInfo
