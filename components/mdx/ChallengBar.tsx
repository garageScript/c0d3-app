import React from 'react'
import NavLink from '../NavLink'

const ChallengeBar: React.FC<{
  href: string
  description: string
  title: string
}> = ({ href, description, title }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="card shadow-sm bg-primary text-white px-4 py-2 border-0">
        <h1 className="text-center font-weight-bold align-self-center">
          {title}
        </h1>
        <p className="px-2 m-0 text-center">{description}</p>
        <div className="text-center">
          <NavLink
            path={href}
            className={`btn btn-light mt-2 text-primary`}
          >
            View Challenges
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ChallengeBar
