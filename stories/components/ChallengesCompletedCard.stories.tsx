import * as React from 'react'
import { ChallengesCompletedCard } from '../../components/ChallengeMaterial'

export default {
  component: ChallengesCompletedCard,
  title: 'Components/ChallengesCompletedCard'
}

export const ChallengesCompleted: React.FC = () => (
  <ChallengesCompletedCard
    lessonId="5"
    starGiven="flimmy"
    imageSrc="icon-challenge-complete.jpg"
    reviewUrl="https://c0d3.com/teacher/5"
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
  />
)
