import React from 'react'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { SubmissionStatus } from '../../graphql/index'
import styles from './reviewStatus.module.scss'
import ReviewerProfile from '../ReviewerProfile'
import Markdown from 'markdown-to-jsx'
dayjs.extend(LocalizedFormat)

const ReviewStatus: React.FC<{
  username?: string
  name?: string
  comment?: string | null
  date: string
  status: SubmissionStatus
  viewedByStudent?: boolean
}> = ({ name, username, comment, date, status, viewedByStudent }) => {
  //don't show comments for open submissions on review page
  if (status === SubmissionStatus.Open && !viewedByStudent) return <></>
  let message
  const parsedDate = dayjs(Number.parseInt(date)).format('LLL')
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
          : `Student has overwritten this submission on ${parsedDate}.`
      }`
      break
    case SubmissionStatus.Open:
      message = 'Your submission is currently waiting to be reviewed.'
      break
    default:
      throw new TypeError('Incorrect status')
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
        <div className="ms-1">{message}</div>
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

export default ReviewStatus
