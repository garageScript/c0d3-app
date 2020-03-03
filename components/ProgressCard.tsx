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
          <span className="font-weight-bold">{progressCount}%</span>
        </div>
        <h4 className="progress-card__title mt-3">
          You&#39;re off to a great start!
        </h4>
        <div className="mt-3">
          <p>
            Start by setting up your development environment and then follow the
            lessons in the course.
          </p>
        </div>
        <a
          className="btn progress-card__button mt-2"
          href="https://www.notion.so/Setup-Instructions-fc8f8fcc1376482ead839fa6b1034cb4#10ab6286f4d942c58bd330f68cb8cb95"
        >
          Setup Development Environment
        </a>
      </div>
    </div>
  )
}

export default ProgressCard
