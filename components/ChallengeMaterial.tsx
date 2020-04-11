import React from 'react'
import { Challenge } from '../@types/challenge'

type ChallengeTitleCardProps = {
  title: string
  challengeNum: number
  currentState?: string
  active?: boolean
}

type ChallengeQuestionCardProps = {
  title: string
  question: string
}

type ChallengeMaterialProps = {
  challenges?: Challenge[]
}

export const ChallengeTitleCard: React.FC<ChallengeTitleCardProps> = props => {
  const { currentState: state, active } = props
  const cardStyles = []
  if (state === 'complete') {
    cardStyles.push('challenge-title-card--done')
  } else {
    cardStyles.push('shadow-sm', 'border-0')
  }
  if (active) {
    cardStyles.push('challenge-title-card--active')
  }
  return (
    <div className={`card mb-2 ${cardStyles.join(' ')}`}>
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

export const ChallengeQuestionCard: React.FC<ChallengeQuestionCardProps> = props => {
  const content = (
    <div className="card-body">
      <h1 className="challenge-question-card__title">{props.title}</h1>
      <div>
        <p className="challenge-question-card__question bg-light p-3 mt-3">
          {props.question}
        </p>
      </div>
    </div>
  )
  return <div className="card shadow-sm border-0">{content}</div>
}

const ChallengeMaterial: React.FC<ChallengeMaterialProps> = props => {
  if (!props.challenges) {
    return <h1>No Challenges for this lesson</h1>
  }
  const sortedChallenges: Challenge[] = props.challenges.sort(
    (a, b) => a.order - b.order
  )
  const challengeTitleCards: React.ReactElement[] = sortedChallenges.map(
    challenge => {
      return (
        <ChallengeTitleCard
          key={challenge.id}
          challengeNum={challenge.order}
          title={challenge.title}
        />
      )
    }
  )
  return (
    <div className="row">
      <div className="col-4">{challengeTitleCards}</div>
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
