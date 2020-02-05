import * as React from 'react'
import LandingNav from '../components/LandingNav'

const IndexPage: React.FC = () => {
  return (
    <div>
      <LandingNav />
      <div className="container text-center">
        <img src="https://dummyimage.com/325x361/000/fff"></img>
        <h1 style={{ fontWeight: 900, marginTop: '1.5rem', fontSize: '4rem' }}>
          Learn Javascript the old school way
        </h1>
        <p className="lead" style={{ marginTop: '1rem' }}>
          Learn all the foundations you need to be a full stack software
          engineer
        </p>
        <button
          className="btn btn-primary py-2 px-4"
          style={{ marginTop: '.5rem' }}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default IndexPage
