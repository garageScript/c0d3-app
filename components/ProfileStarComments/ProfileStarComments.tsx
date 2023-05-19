import React from 'react'
import { Star as StarType } from '../../graphql/index'
import { Star as StarIcon } from 'react-feather'
import _ from 'lodash'
import styles from './profileStarComments.module.scss'

type StarCommentsProps = {
  stars: StarType[]
}

type StarCommentProps = {
  star: StarType
}

const StarComment: React.FC<StarCommentProps> = ({ star }) => {
  const fullname = _.get(star, 'student.name', '')
  const username = _.get(star, 'student.username', '')
  const lessonTitle = _.get(star, 'lesson.title', '')
  const starComment = _.get(star, 'comment', '')
  const firstName = fullname.split(' ')[0] || 'A'
  const lastName = fullname.split(' ')[1] || ' '
  return (
    <div className="mb-3 py-3 bg-white rounded shadow-sm">
      <div className="mx-2 d-flex justify-content-between align-items-center">
        <div className="d-flex mt-1 align-items-center">
          <h6
            className={`${styles['comment-student-initials']} mx-3 justify-content-center align-items-center d-flex text-uppercase bg-primary rounded-circle text-light`}
          >
            {firstName[0] + lastName[0]}
          </h6>
          <div>
            <h6 className="text-md-start text-muted fw-bold mb-0">
              {'@' + username}
            </h6>
            <h6
              className={`${styles['comment-lesson-title']} text-muted text-start`}
            >
              {lessonTitle}
            </h6>
          </div>
        </div>
        <StarIcon className="mx-3" strokeWidth="1" size={15} fill="yellow" />
      </div>
      {starComment ? (
        <>
          <hr />
          <div className="flex-auto">
            <p className={`${styles['comment-text']} pt-2 px-3 text-md`}>
              {starComment}
            </p>
          </div>
        </>
      ) : null}
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
      <div className="d-flex card mt-4 shadow-sm">
        <div className="d-flex card-body">
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
