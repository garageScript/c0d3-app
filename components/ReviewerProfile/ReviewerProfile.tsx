import React from 'react'
import styles from './reviewerProfile.module.scss'

type ReviewerProfileProps = {
  username: string | undefined | null
  name: string | undefined | null
  inline?: boolean
}
const ReviewerProfile: React.FC<ReviewerProfileProps> = ({
  username,
  name,
  inline
}) => {
  //TO-DO fix User type to make these fields non-nullable
  const firstName = name ? name.split(' ')[0] : ''
  const lastName = name?.split(' ')[1] || ''
  return (
    <div className={`${inline ? styles['wrapper'] : ''}`}>
      <a
        className={`${
          styles[inline ? 'comment_author__inline' : 'comment_author']
        } mt-2 `}
        href={username ? `/profile/${username}` : undefined}
      >
        <div className="d-inline">{`${firstName} ${lastName}`}</div>
        <div className="d-inline text-muted">
          {username ? ' @' + username : ''}
        </div>
      </a>
    </div>
  )
}
export default ReviewerProfile
