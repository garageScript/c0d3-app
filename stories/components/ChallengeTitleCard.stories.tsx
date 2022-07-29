import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { ChallengeTitleCard } from '../../components/ChallengeMaterial/ChallengeMaterial'

export default {
  component: ChallengeTitleCard,
  title: 'Components/ChallengeTitleCard'
}

const props = {
  key: 105,
  description:
    'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
  id: 105,
  challengeNum: 0,
  title: 'Greater than 5',
  setCurrentChallenge: action('clicked'),
  submissionStatus: 'unsubmitted'
}

export const Basic: React.FC = () => <ChallengeTitleCard {...props} />

export const Pending: React.FC = () => (
  <ChallengeTitleCard {...props} submissionStatus="open" />
)

export const Rejected: React.FC = () => (
  <ChallengeTitleCard {...props} submissionStatus="needMoreWork" />
)

export const Complete: React.FC = () => (
  <ChallengeTitleCard {...props} submissionStatus="passed" />
)

export const Active: React.FC = () => (
  <ChallengeTitleCard {...props} active={true} />
)

export const ActivePending: React.FC = () => (
  <ChallengeTitleCard
    {...props}
    active={true}
    submissionStatus="needMoreWork"
  />
)

export const ActiveRejected: React.FC = () => (
  <ChallengeTitleCard
    {...props}
    active={true}
    submissionStatus="needMoreWork"
  />
)

export const ActiveComplete: React.FC = () => (
  <ChallengeTitleCard {...props} active={true} submissionStatus="passed" />
)
