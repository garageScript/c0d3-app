import React from 'react'
import { Star as StarType } from '../@types/lesson'
import { Star as StarIcon } from 'react-feather'
import '../scss/profileStarComments.scss'

type StarCommentsProps = {
  stars: StarType[]
}

type StarCommentProps = {
  star: StarType
}

const StarComment: React.FC<StarCommentProps> = ({ star }) => {
  const { lessonTitle, studentUsername, studentName, comment } = star
  const [firstName, lastName] = studentName.split(' ') || ['A', ' '] // A for Anon
  return (
    <div className="comment-box shadow-sm">
      <div className="comment-profile-container">
        <div className="text-uppercase bg-primary rounded-circle text-light user-info-image">
          {firstName[0]}
          {lastName[0]}
        </div>
        <div>
          <div className="comment-username text-left">
            {'@' + studentUsername}
          </div>
          <h6 className="comment-lesson-title text-left">{lessonTitle}</h6>
        </div>
      </div>
      <hr />
      <div className="comment-text-container">
        <StarIcon
          className="comment-star-icon"
          strokeWidth={'1'}
          size={30}
          fill="yellow"
        />
        <div className="comment-text">{comment}</div>
      </div>
    </div>
  )
}

export const ProfileStarComments: React.FC<StarCommentsProps> = ({ stars }) => {
  stars.sort((a, b) => b.lessonDifficulty - a.lessonDifficulty)

  const displayStarComments = stars.map((star: StarType, commentId: number) => {
    return <StarComment key={commentId} star={star} />
  })
  return (
    <div className="profile-comments">
      <div className="comments-container card shadow-sm">
        <div className="card-body text-center">
          <div>{displayStarComments}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStarComments
