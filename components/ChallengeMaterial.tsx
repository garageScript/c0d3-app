import React, { useState } from 'react'
import { Challenge } from '../@types/challenge'

type CurrentChallengeID = string | null

type ChallengeTitleCardProps = {
  key: string
  id: string
  title: string
  challengeNum: number
  currentState?: string
  active?: boolean
  setCurrentChallenge: React.Dispatch<CurrentChallengeID>
}

type ChallengeQuestionCardProps = {
  currentChallenge: Challenge
}

type ChallengeMaterialProps = {
  challenges?: Challenge[]
}

export const ChallengeTitleCard: React.FC<ChallengeTitleCardProps> = props => {
  const { currentState: state, active } = props
  const cardStyles: string[] = []
  if (active) {
    cardStyles.push('challenge-title-card--active')
  }
  if (state === 'complete') {
    cardStyles.push('challenge-title-card--done')
  } else {
    cardStyles.push('shadow-sm', 'border-0', 'challenge-title-card')
  }
  return (
    <div
      data-testid="challenge-title"
      className={`card mb-2 ${cardStyles.join(' ')}`}
      onClick={() => props.setCurrentChallenge(props.id)}
    >
      <div className="card-body d-flex justify-content-between">
        <div>{`${props.challengeNum}. ${props.title}`}</div>
        {state === 'complete' && (
          <img
            width="25px"
            height="25px"
            src="/curriculumAssets/icons/checkmark.svg"
          />
        )}
        {state === 'pending' && (
          <img
            width="25px"
            height="25px"
            src="/curriculumAssets/icons/pending.svg"
          />
        )}
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
          {currentChallenge.title}
        </h1>
        <div>
          <p
            data-testid="challenge-question-description"
            className="card-question bg-light p-3 mt-3"
          >
            {currentChallenge.description}
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
  //TODO: once user has completed a challenge find the first incomplete challenge that
  //hasn't been completed to set as default challengeID
  const [currentChallengeID, setCurrentChallenge] = useState<
    CurrentChallengeID
  >()
  //assign currentChallenge to first challenge if no match found
  const currentChallenge =
    sortedChallenges.find(
      (challenge: Challenge) => challenge.id === currentChallengeID
    ) || sortedChallenges[0]
  console.log(sortedChallenges)
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
