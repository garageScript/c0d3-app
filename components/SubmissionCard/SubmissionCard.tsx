import React from 'react'
import { Button } from '../theme/Button'
import UserInfoImage from '../UserInfoImage'
import { UserInfo } from '../../@types/user'
import styles from './submissionCard.module.scss'

type Props = {
  userId: string
  time: string
  challengeTitle: string
  reviewUrl: string
  user: UserInfo
}

const SubmissionCard: React.FC<Props> = ({
  user,
  userId,
  time,
  challengeTitle,
  reviewUrl
}) => {
  return (
    <div className="card shadow-sm me-3">
      <div className="card-header bg-white">
        <div className="row no-gutters">
          <div className="col-0 me-3">
            <div
              className={`${styles['submissioncard_user_info_image_container']}`}
            >
              <UserInfoImage user={user} />
            </div>
          </div>
          <div className="col-8">
            <h5 className="m-0">{userId}</h5>
            <div className="text-muted">
              <small>Submitted on {time}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text text-primary">{challengeTitle}</p>
        <a className="d-inline-block" href={reviewUrl}>
          <Button color="white" btnType="primary">
            Review
          </Button>
        </a>
      </div>
    </div>
  )
}

export default SubmissionCard
