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

const ProgressBar: React.FC<{ progressCount: number }> = ({
  progressCount
}) => {
  return (
    <div className="bg-white my-3 rounded">
      <div
        className={`${styles['progress-card__horizontal']} bg-info d-flex ${
          progressCount >= 100 ? 'rounded' : 'rounded-left'
        }`}
        style={{
          width: progressCount <= 0 ? 'min-content' : `${progressCount}%`
        }}
      >
        <div className="align-self-center px-1 ml-auto font-weight-bold">
          {progressCount}%
        </div>
      </div>
    </div>
  )
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
  const mobile = (
    <div className="text-center">
      {loggedIn ? (
        <>
          <h4 className={`${styles['progress-card__title']} mt-3 `}>
            {setHeaderFromProgress(progressCount)}
          </h4>
        </>
      ) : (
        <h4 className={`${styles['progress-card__title']} mt-3`}>
          Join C0D3 now and start your software engineering journey!
        </h4>
      )}
      <ProgressBar progressCount={90} />
    </div>
  )
  const tabletAndDesktop = (
    <>
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
    </>
  )
  return (
    <div
      className={`${styles['progress-card__container']} d-flex card shadow-sm mt-3 bg-primary text-white px-3 py-2 border-0`}
    >
      <div className="d-block d-xl-none">{mobile}</div>
      <div className="d-none d-xl-block">{tabletAndDesktop}</div>

      <div className="mt-3">
        Join us on
        <NavLink
          className={`${styles['progress-newuser__chatlink']} text-white`}
          path="https://discord.gg/c0d3"
          external
        >
          <p className="font-weight-bold d-inline">Discord</p>
        </NavLink>
        to ask your questions. Start by setting up your development environment
        and then follow the lessons in the course.
      </div>
      <NavLink
        path="/docs/setup"
        className={`btn btn-light ${styles['progress-card__button']} mt-2 text-primary`}
      >
        Setup Development Environment
      </NavLink>
    </div>
  )
}

export default ProgressCard
