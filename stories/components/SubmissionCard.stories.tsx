import React from 'react'
import SubmissionCard from '../../components/SubmissionCard'

export default {
  component: SubmissionCard,
  title: 'Components/SubmissionCard'
}

const rahulK = {
  firstName: 'Rahul',
  lastName: 'Kalra',
  username: 'noob101'
}

export const PendingSubmission: React.FC = () => (
  <SubmissionCard
    userId="noob101"
    time="Mar 25th 1:37pm"
    challengeTitle="Getting To Know Your Computer, pt. 1 - All Except You!"
    reviewUrl="#"
    user={rahulK}
  />
)

export const MultipleCards: React.FC = () => (
  <div className="card-group">
    <SubmissionCard
      userId="noob101"
      user={rahulK}
      time="Mar 25th 1:37pm"
      challengeTitle="Getting To Know Your Computer, pt. 1 - All Except You!"
      reviewUrl="#"
    />
    <SubmissionCard
      userId="hwong0305"
      user={rahulK}
      time="Mar 29th 12:09am"
      challengeTitle="Uploading a File From Your Computer to Your Website"
      reviewUrl="#"
    />
    <SubmissionCard
      userId="aortizoj"
      user={rahulK}
      time="Mar 27th 9:58pm"
      challengeTitle="Biggest Num out of 2"
      reviewUrl="#"
    />
  </div>
)
