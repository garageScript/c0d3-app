import React from 'react'

type UserProps = {
  user: UserInfo
}
type UserInfo = {
  firstName: string
  lastName: string
}

const UserInfoImage: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="row no-gutters">
      <div className="col-0">
        <h6 className="text-uppercase bg-primary rounded-circle text-light p-3 mr-3">
          {user.firstName[0] + user.lastName[0]}
        </h6>
      </div>
    </div>
  )
}

export default UserInfoImage
