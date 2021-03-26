import React from 'react'
import { Star as StarType } from '../graphql/index'
import { Star as StarIcon } from 'react-feather'
import styles from '../scss/profileStarComments.module.scss'

type StarCommentsProps = {
  stars: StarType[]
}

type StarCommentProps = {
  star: StarType
}

const StarComment: React.FC<StarCommentProps> = ({ star }) => {
  const { lessonTitle, studentUsername, studentName, comment } = star
  const firstName = studentName!.split(' ')[0] || 'A'
  const lastName = studentName!.split(' ')[1] || ' '
  return (
    <div className={`${styles['comment-box']} shadow-sm`}>
      <div className={`${styles['comment-profile-container']}`}>
        <div
          className={`${styles['user-info-image']} text-uppercase bg-primary rounded-circle text-light`}
        >
          {firstName[0]}
          {lastName[0]}
        </div>
        <div>
          <div className={`${styles['comment-username']} text-left`}>
            {'@' + studentUsername}
          </div>
          <h6 className={`${styles['comment-lesson-title']} text-left`}>
            {lessonTitle}
          </h6>
        </div>
      </div>
      <hr />
      <div className={`${styles['comment-text-container']}`}>
        <StarIcon
          className={`${styles['comment-star-icon']}`}
          strokeWidth={'1'}
          size={30}
          fill="yellow"
        />
        <div className={`${styles['comment-text']}`}>{comment}</div>
      </div>
    </div>
  )
}

export const ProfileStarComments: React.FC<StarCommentsProps> = ({ stars }) => {
  stars.sort((a, b) => b.lessonOrder! - a.lessonOrder!)

  const displayStarComments = stars.map((star: StarType, commentId: number) => {
    return <StarComment key={commentId} star={star} />
  })
  return (
    <div className={`${styles['profile-comments']}`}>
      <div className={`${styles['comments-container']} card shadow-sm`}>
        <div className="card-body text-center">
          <div>{displayStarComments}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStarComments
