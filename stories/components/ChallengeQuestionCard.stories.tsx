import * as React from 'react'
import { ChallengeQuestionCard } from '../../components/ChallengeMaterial/ChallengeMaterial'
import { MockedProvider } from '@apollo/client/testing'

export default {
  component: ChallengeQuestionCard,
  title: 'Components/ChallengeQuestionCard'
}

const currentChallenge = {
  description:
    'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
  id: 105,
  order: 0,
  lessonId: 23,
  title: 'Greater than 5',
  status: 'unsubmitted'
}

export const Basic: React.FC = () => (
  <MockedProvider>
    <ChallengeQuestionCard currentChallenge={currentChallenge} />
  </MockedProvider>
)
