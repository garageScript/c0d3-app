import * as React from 'react'
import ChallengeQuestionCard from '../../components/ChallengeQuestionCard'

export default {
  component: ChallengeQuestionCard,
  title: 'Components/ChallengeQuestionCard'
}

export const Basic: React.FC = () => (
  <ChallengeQuestionCard
    title="Less Than or Equal to 5"
    question="Write a function that takes in an array, and returns an array of same length where all elements <= 5 is changed to 0."
  />
)
