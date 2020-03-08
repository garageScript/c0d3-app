import React from 'react'
import ChallengeTitleCard from '../components/ChallengeTitleCard'
import ChallengeQuestionCard from '../components/ChallengeQuestionCard'

const ChallengeMaterial: React.FC = () => {
  return (
    <div className="row">
      <div className="col-4">
        <ChallengeTitleCard challengeNum={1} title="Less Than or Equal to 5" />
      </div>
      <div className="col-8">
        <ChallengeQuestionCard
          title="Less Than or Equal to 5"
          question="Write a function that takes in an array, and returns an array of same length where all elements <= 5 is changed to 0."
        />
      </div>
    </div>
  )
}

export default ChallengeMaterial
