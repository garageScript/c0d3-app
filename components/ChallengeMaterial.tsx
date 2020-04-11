import React, { useState } from 'react'
import { Challenge } from '../@types/challenge'

import '../scss/challengeMaterial.scss'

type CurrentChallengeID = string | null

type ChallengeTitleCardProps = {
  key: string
  id: string
  title: string
  challengeNum: number
  currentState?: string
  setCurrentChallenge: React.Dispatch<CurrentChallengeID>
}

type ChallengeQuestionCardProps = {
  currentChallenge: Challenge | undefined
}

type ChallengeMaterialProps = {
  challenges?: Challenge[]
}

export const ChallengeTitleCard: React.FC<ChallengeTitleCardProps> = props => {
  return (
    <div
      data-testid="challenge-title"
      className="card shadow-sm border-0 mb-2 challenge-title"
      onClick={() => props.setCurrentChallenge(props.id)}
    >
      <div className="card-body">
        <div>{`${props.challengeNum}. ${props.title}`}</div>
      </div>
    </div>
  )
}

export const ChallengeQuestionCard: React.FC<ChallengeQuestionCardProps> = ({
  currentChallenge
}) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body challenge-question">
        <h1 data-testid="challenge-question-title" className="card-title">
          {currentChallenge!.title}
        </h1>
        <div>
          <p
            data-testid="challenge-question-description"
            className="card-question bg-light p-3 mt-3"
          >
            {currentChallenge!.description}
          </p>
        </div>
      </div>
    </div>
  )
}

const ChallengeMaterial: React.FC<ChallengeMaterialProps> = props => {
  if (!props.challenges) {
    return <h1>No Challenges for this lesson</h1>
  }
  const sortedChallenges: Challenge[] = props.challenges.sort(
    (a, b) => a.order - b.order
  )
  const [currentChallengeID, setCurrentChallenge] = useState<
    CurrentChallengeID
  >(sortedChallenges[0].id)
  const currentChallenge = sortedChallenges.find(
    (challenge: Challenge) => challenge.id === currentChallengeID
  )
  const challengeTitleCards: React.ReactElement[] = sortedChallenges.map(
    challenge => {
      return (
        <ChallengeTitleCard
          key={challenge.id}
          id={challenge.id}
          challengeNum={challenge.order}
          title={challenge.title}
          setCurrentChallenge={setCurrentChallenge}
        />
      )
    }
  )
  return (
    <div className="row challenge-display">
      <div className="col-4">{challengeTitleCards}</div>
      <div className="col-8">
        <ChallengeQuestionCard currentChallenge={currentChallenge} />
      </div>
    </div>
  )
}

export default ChallengeMaterial
