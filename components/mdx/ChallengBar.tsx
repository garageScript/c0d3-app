import React from 'react'
import NavLink from '../NavLink'
import MDXcomponents from '../../helpers/mdxComponents'

const ChallengeBar: React.FC<{
  href: string
  description: string
  title: string
}> = ({ href, description, title }) => {
  return (
    <div className="my-3 mt-5">
      <div className="d-flex flex-col flex-md-row gap-3 justify-content-between align-items-none align-items-md-center card shadow-sm bg-primary text-white p-4 border-0">
        <div>
          <span className="align-self-center fs-4">{title}</span>
          <p className="m-0">{description}</p>
        </div>
        <div className="d-flex flex-column gap-2">
          <NavLink
            path={href}
            className="btn btn-light text-primary p-3"
            external
          >
            View Challenges
          </NavLink>
          <MDXcomponents.a>
            <NavLink
              path="/docs/setup#submitting-challenges"
              className="text-white d-block"
              external
            >
              How to submit challenges?
            </NavLink>
          </MDXcomponents.a>
        </div>
      </div>
    </div>
  )
}

export default ChallengeBar
