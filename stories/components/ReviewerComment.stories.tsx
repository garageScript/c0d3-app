import React from 'react'
import { ReviewerComment } from '../../components/ReviewerComment'
import { SubmissionStatus } from '../../graphql'

export default {
  component: ReviewerComment,
  title: 'Components/ReviewComment'
}

const data = {
  name: 'Admin',
  username: 'admin',
  date: '0'
}

export const Accepted: React.FC = () => {
  return (
    <ReviewerComment
      {...data}
      comment="Good job!"
      status={SubmissionStatus.Passed}
    />
  )
}

export const Rejected: React.FC = () => {
  return (
    <ReviewerComment
      {...data}
      comment="Error on line 3"
      status={SubmissionStatus.NeedMoreWork}
    />
  )
}

export const OverwrittenReviewer: React.FC = () => {
  return <ReviewerComment date="0" status={SubmissionStatus.Overwritten} />
}
export const OverwrittenStudent: React.FC = () => {
  return <ReviewerComment date="0" status={SubmissionStatus.Overwritten} />
}

export const OpenReviewer: React.FC = () => {
  return <ReviewerComment date="0" status={SubmissionStatus.Open} />
}

export const OpenForStudent: React.FC = () => {
  return <ReviewerComment date="0" status={SubmissionStatus.Open} />
}
