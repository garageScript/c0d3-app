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
  return (
    <div
      className={`${
        status === SubmissionStatus.Passed ? styles.passed : styles.rejected
      } px-2 py-1 my-3`}
    >
      <div className="d-flex align-items-center">
        <img
          src="/assets/requestChanges.svg"
          className={
            status === SubmissionStatus.Passed
              ? styles.icon__accepted
              : styles.icon__rejected
          }
        />
        <ReviewerProfile name={name} username={username} />
        <div className={`ml-2`}>
          {status === SubmissionStatus.Passed
            ? 'accepted submission on '
            : 'requested changes on '}
          {dayjs(Number.parseInt(date)).format('dddd, MMMM D, YYYY')}:
        </div>
      </div>
      <hr />
      <Markdown>{comment}</Markdown>
    </div>
  )
}
