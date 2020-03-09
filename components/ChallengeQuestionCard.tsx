import React from 'react'
import '../scss/challengeQuestionCard.scss'

type Props = {
  title: string
  question: string
}

const ChallengeQuestionCard: React.FC<Props> = props => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="challenge-question-card__title">{props.title}</h1>
        <div>
          <p className="challenge-question-card__question bg-light p-3 mt-3">
            {props.question}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChallengeQuestionCard
