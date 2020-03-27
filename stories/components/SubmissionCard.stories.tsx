import React from 'react'
import SubmissionCard from '../../components/SubmissionCard'

export default {
  component: SubmissionCard,
  title: 'Components/SubmissionCard'
}

export const PendingSubmission: React.FC = () => (
  <SubmissionCard
    userId="noob101"
    initial="NB"
    time="Mar 25th 1:37pm"
    challengeTitle="Getting To Know Your Computer, pt. 1 - All Except You!"
    reviewUrl="#"
  />
)
