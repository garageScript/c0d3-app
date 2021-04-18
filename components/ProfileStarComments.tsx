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
  const {
    lesson: { title },
    student: { username, name },
    comment
  } = star
  const firstName = name!.split(' ')[0] || 'A'
  const lastName = name!.split(' ')[1] || ' '
  return (
    <div className={`${styles['comment-box']} shadow-sm`}>
      <div className={`${styles['comment-profile-container']}`}>
        <div className={`${styles['user-info-wrapper']}`}>
          <div
            className={`${styles['user-info-image']} text-uppercase bg-primary rounded-circle text-light`}
          >
            {firstName[0]}
            {lastName[0]}
          </div>
          <div>
            <div className={`${styles['comment-username']} text-left`}>
              {'@' + username}
            </div>
            <h6 className={`${styles['comment-lesson-title']} text-left`}>
              {title}
            </h6>
          </div>
        </div>
        <StarIcon
          className={`${styles['comment-star-icon']}`}
          strokeWidth={'1'}
          size={15}
          fill="yellow"
        />
      </div>
      <hr />
      <div className={`${styles['comment-text-container']}`}>
        <div className={`${styles['comment-text']}`}>{comment}</div>
      </div>
    </div>
  )
}

export const ProfileStarComments: React.FC<StarCommentsProps> = ({ stars }) => {
  stars.sort((a, b) => b.lesson.order! - a.lesson.order!)

  const displayStarComments = stars.map((star: StarType, commentId: number) => {
    return <StarComment key={commentId} star={star} />
  })
  return (
    <div className={`${styles['profile-comments']}`}>
      <div className={`${styles['comments-container']} card shadow-sm`}>
        <div className={`${styles['comments-container-title']} card-body`}>
          <h3>Stars</h3>
        </div>
        <div className="card-body text-center">
          <div>{displayStarComments}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStarComments
