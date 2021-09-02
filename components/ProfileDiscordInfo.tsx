import React from 'react'
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
      <div className="d-flex card-body">
        <h3>Discord</h3>
      </div>
      <div className="ml-auto mr-auto mt-4">
        <Image
          className="avatar"
          loader={() => avatar}
          src={avatar}
          width={60}
          height={60}
        />
      </div>
      <h4 className="text-center text-muted mt-4">{'@' + username}</h4>
      {/* https://discordapp.com/users/<id>/ */}
      {/* next/image doesn't support styles so this is the workaround: https://github.com/vercel/next.js/discussions/18312 */}
      <style jsx global>{`
        .avatar {
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}

export default ProfileDiscordInfo
