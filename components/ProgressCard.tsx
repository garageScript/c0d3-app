import React from 'react'

import '../scss/progressCard.scss'

type Props = {
  progressCount: number
}

const ProgressCard: React.FC<Props> = ({ progressCount }) => {
  return (
    <div className="progress-card__container card shadow-sm mt-3">
      <div className="card-body">
        <div className="progress-card__progress-bar">
          <span className="d-block font-weight-bold pt-2">
            {progressCount}%
          </span>
        </div>
        <div className="progress-card__title mt-3">{`You're off to a great start!`}</div>
        <div className="mt-3">
          <p className="progress-card__paragraph">
            {`Start by `}
            <a className="progress-card__link" href="#">
              setting up your development environment
            </a>
            {` and then follow the lessons in the course.`}
          </p>
        </div>
        <button className="btn progress-card__button mt-2">{`Setup Development Environment`}</button>
      </div>
    </div>
  )
}

export default ProgressCard
