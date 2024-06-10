import React from 'react'
import ReviewStatus from '../../components/ReviewStatus'
import { SubmissionStatus } from '../../graphql'

export default {
  component: ReviewStatus,
  title: 'Components/ReviewStatus'
}

const data = {
  name: 'Admin',
  username: 'admin',
  date: '0'
}

export const Accepted: React.FC = () => {
  return (
    <ReviewStatus
      {...data}
      comment="Good job!"
      status={SubmissionStatus.Passed}
    />
  )
}
export const AcceptedWithoutComment: React.FC = () => {
  return <ReviewStatus {...data} status={SubmissionStatus.Passed} />
}

export const Rejected: React.FC = () => {
  return (
    <ReviewStatus
      {...data}
      comment="Error on line 3"
      status={SubmissionStatus.NeedMoreWork}
    />
  )
}

export const OverwrittenReviewer: React.FC = () => {
  return <ReviewStatus date="0" status={SubmissionStatus.Overwritten} />
}
export const OverwrittenStudent: React.FC = () => {
  return (
    <ReviewStatus
      date="0"
      status={SubmissionStatus.Overwritten}
      viewedByStudent
    />
  )
}

export const OpenForStudent: React.FC = () => {
  return (
    <ReviewStatus date="0" status={SubmissionStatus.Open} viewedByStudent />
  )
}
