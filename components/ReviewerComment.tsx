import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { SubmissionStatus } from '../graphql/index'
import styles from '../scss/reviewerComment.module.scss'
import ReviewerProfile from './ReviewerProfile'
import Markdown from 'markdown-to-jsx'
dayjs.extend(relativeTime)

export const ReviewerComment: React.FC<{
  username: string
  name: string
  comment: string
  date: string
  status: SubmissionStatus
}> = ({ name, username, comment, date, status }) => {
  let message
  switch (status) {
    case SubmissionStatus.Passed:
      message = ' accepted submission on '
      break
    case SubmissionStatus.NeedMoreWork:
      message = ' requested changes on '
      break
    case SubmissionStatus.Overwritten:
      message = 'Overwritten on '
      break
    default:
      message = 'error'
      break
  }
  return (
    <div
      className={`${styles[status]} ${styles['status__border']} px-2 py-1 my-3`}
    >
      <div className="d-flex align-items-center">
        <img
          src="/assets/requestChanges.svg"
          className={`${styles[`icon__${status}`]} ${styles['icon']}`}
        />
        <ReviewerProfile name={name} username={username} />
        <div className="ml-1">
          {message}
          {dayjs(Number.parseInt(date)).format('dddd, MMMM D, YYYY')}:
        </div>
      </div>
      <hr />
      <Markdown>{comment}</Markdown>
    </div>
  )
}
