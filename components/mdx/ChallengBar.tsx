import React from 'react'
import NavLink from '../NavLink'

const ChallengeBar: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="w-100 card shadow-sm mt-3 bg-primary text-white p-2 border-0">
        <h1 className="text-center font-weight-bold">
          Master your skills by solving challenges
        </h1>
        <p className="px-2 text-center">
          We have curated the challenges so that it can give you concrete
          foundation.
        </p>
        <div className="d-flex justify-content-center">
          <NavLink path={src} className={`btn btn-light mt-2 text-primary`}>
            View Challenges
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ChallengeBar
