import * as React from 'react'
import UserInfoImage from '../../components/UserInfoImage'

export default {
  component: UserInfoImage,
  title: 'Components/UserInfoImage'
}

const user = {
  firstName: 'Rahul',
  lastName: 'Kalra'
}

export const _UserInfoImage: React.FC = () => {
  return (
    <div
      style={{
        width: '50px',
        height: '50px'
      }}
    >
      <UserInfoImage user={user} />
    </div>
  )
}
