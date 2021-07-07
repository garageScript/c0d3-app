import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { SubmissionStatus } from '../graphql/index'
import styles from '../scss/reviewerComment.module.scss'
import ReviewerProfile from './ReviewerProfile'
import Markdown from 'markdown-to-jsx'
dayjs.extend(relativeTime)

export const ReviewerComment: React.FC<{
  username?: string
  name?: string
  comment?: string | null
  date: string
  status: SubmissionStatus
  viewedByStudent?: boolean
}> = ({ name, username, comment, date, status, viewedByStudent }) => {
  //reviewer don't comment for open submission
  if (status === SubmissionStatus.Open && !viewedByStudent) return <></>
  let message
  const parsedDate = dayjs(Number.parseInt(date)).format('dddd, MMMM D, YYYY')
  switch (status) {
    case SubmissionStatus.Passed:
      message = ` accepted submission on ${parsedDate}.`
      break
    case SubmissionStatus.NeedMoreWork:
      message = ` requested changes on ${parsedDate}.`
      break
    case SubmissionStatus.Overwritten:
      message = `${
        viewedByStudent
          ? `You have overwritten this submission on ${parsedDate}.`
          : `Student has overwirtten this submission on ${parsedDate}.`
      }`
      break
    case SubmissionStatus.Open:
      message = 'Your submission is currently waiting to be reviewed.'
      break
    default:
      message = 'Incorrect status'
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
        <div className="ml-1">{message}</div>
      </div>
      {comment && (
        <>
          <hr />
          <Markdown>{comment}</Markdown>
        </>
      )}
    </div>
  )
}
