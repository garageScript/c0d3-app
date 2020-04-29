import React from 'react'
import NavLink from './NavLink'

import styles from '../scss/progressCard.module.scss'

type Props = {
  progressCount: number
}

const ProgressCard: React.FC<Props> = ({ progressCount }) => {
  return (
    <div
      className={`${styles['progress-card__container']} d-flex card shadow-sm mt-3 bg-primary text-white p-2 border-0`}
    >
      <div className="card-body">
        <div
          className={`${styles['progress-card__progress-bar']} d-flex justify-content-center align-items-center rounded-circle`}
        >
          <span className="font-weight-bold">{progressCount}%</span>
        </div>
        <h4 className={`${styles['progress-card__title']} mt-3`}>
          You&#39;re off to a great start!
        </h4>
        <div className="mt-3">
          <p>
            Start by setting up your development environment and then follow the
            lessons in the course.
          </p>
        </div>
        <NavLink
          path="https://www.notion.so/Setup-Instructions-fc8f8fcc1376482ead839fa6b1034cb4#10ab6286f4d942c58bd330f68cb8cb95"
          className={`btn btn-light ${styles['progress-card__button']} mt-2 text-primary`}
          external
        >
          Setup Development Environment
        </NavLink>
      </div>
    </div>
  )
}

export default ProgressCard
