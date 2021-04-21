import React from 'react'
import NavLink from '../NavLink'

const ChallengeBar: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="card shadow-sm mt-3 bg-primary text-white p-2 border-0">
      <h1>Master your skills by solving challenges</h1>
      <p>
        Master your skills by solving the challenges. We have curated the
        challenges so that it can give you concrete foundation.
      </p>
      <NavLink path={src} className={`btn btn-light mt-2 text-primary`}>
        View Challenges
      </NavLink>
    </div>
  )
}  

export default ChallengeBar
