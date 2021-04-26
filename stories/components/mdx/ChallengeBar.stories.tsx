import React from 'react'
import ChallengeBar from '../../../components/mdx/ChallengBar'

export default {
  component: ChallengeBar,
  title: 'mdx/ChallengeBar'
}

export const Standart: React.FC = () => {
  return (
    <ChallengeBar
      href="/"
      description="Complete the first seven of JS0 challenges"
      title="Master your skill by solving challenges"
    />
  )
}
