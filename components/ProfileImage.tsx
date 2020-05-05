import React from 'react'

const ProfileImage: React.FC = props => {
  console.log('Props:', props)
  return (
    <div className="card shadow-sm">
      <div
        className="profile_image_placeholder"
        style={{
          height: '120px',
          width: '120px',
          borderRadius: '50%',
          backgroundColor: 'yellow',
          textAlign: 'center',
          marginTop: '15%',
          marginBottom: '20%',
          marginLeft: '45%'
        }}
      >
        <h2
          className="profile_image_user_ full_name"
          style={{
            textAlign: 'center',
            marginTop: '200px',
            width: '200px',
            marginLeft: '-40px'
          }}
        >
          {props.user.firstName + ' ' + props.user.lastName}
        </h2>
        <h4
          className="profile_image_username"
          style={{ color: 'gray', textAlign: 'center' }}
        >
          {'@' + props.user.userName}
        </h4>
      </div>
    </div>
  )
}

export default ProfileImage
