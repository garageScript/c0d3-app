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

export const Overwritten: React.FC = () => {
  return (
    <ReviewerComment
      username=""
      name=""
      date="0"
      comment=""
      status={SubmissionStatus.Overwritten}
    />
  )
}
