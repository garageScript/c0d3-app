import React from 'react'
import '../scss/userInfoImage.scss'

type UserProps = {
  user: UserInfo
}
type UserInfo = {
  firstName: string
  lastName: string
}

const UserInfoImage: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="text-uppercase bg-primary rounded-circle text-light user_info_image">
      {user.firstName[0] + user.lastName[0]}
    </div>
  )
}

export default UserInfoImage
