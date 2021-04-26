import React from 'react'
import NavLink from './NavLink'
import styles from '../scss/progressCard.module.scss'

type CardProps = {
  progressCount: number
  loggedIn: boolean
}
type SVGProps = {
  progressCount: number
}

const ProgressSVG: React.FC<SVGProps> = ({ progressCount }) => {
  let x = 15
  if (progressCount === 100) x = 9
  else if (progressCount >= 10) x = 11
  return (
    <div
      className={`${styles['progress-card__wrapper']} d-flex align-items-center`}
    >
      <svg viewBox="0 0 40 40" width="65px">
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="transparent"
          stroke="#3a22b8"
          strokeWidth="4.5"
        />
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="transparent"
          stroke="#fff"
          strokeDasharray={`${progressCount} ${100 - progressCount}`}
          strokeDashoffset="20"
          strokeWidth="4.5"
        />
        <g className="circle-label">
          <text
            color="#fff"
            x={x}
            y="23"
            fill="#fff"
            style={{ font: 'bold 10px sans-serif' }}
          >
            {progressCount}
            <tspan fontSize="8px">%</tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}

const setHeaderFromProgress = (progressCount: number) => {
  if (progressCount <= 13) {
    // Has not finished 1st module yet
    return `You're off to a great start!`
  } else if (progressCount <= 50) {
    return `Keep up the great work!`
  } else if (progressCount < 100) {
    return `Well done! You're over half way!`
  } else {
    // Assertion: progressCount = 100
    return `Congratulations! You've finished the course!`
  }
}

const ProgressCard: React.FC<CardProps> = ({ progressCount, loggedIn }) => {
  return (
    <div
      className={`${styles['progress-card__container']} d-flex card shadow-sm mt-3 bg-primary text-white p-2 border-0`}
    >
      <div className="card-body">
        {loggedIn ? (
          <>
            <ProgressSVG progressCount={progressCount} />
            <h4 className={`${styles['progress-card__title']} mt-3`}>
              {setHeaderFromProgress(progressCount)}
            </h4>
          </>
        ) : (
          <h4 className={`${styles['progress-card__title']} mt-3`}>
            Join C0D3 now and start your software engineering journey!
          </h4>
        )}

        <div className="mt-3">
          Join us on
          <NavLink
            className={`${styles['progress-newuser__chatlink']} text-white`}
            path="https://discord.gg/c0d3"
            external
          >
            Discord
          </NavLink>
          to ask your questions.
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
