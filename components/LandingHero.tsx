import * as React from 'react'

const LandingHero = () => {
  return (
    <React.Fragment>
      <div className="row justify-center mt-5">
        <div className="col-md-6 offset-md-3">
          <img src="header-01.svg" alt="Hero Image"></img>
        </div>
      </div>
      <div className="row justify-center mt-5">
        <div className="col-md-8 offset-md-2">
          <h1 style={{ fontWeight: 900, fontSize: '3.8rem' }}>
            Learn Javascript the old school way
          </h1>
        </div>
      </div>
      <div className="row justify-center mt-4">
        <div className="col-md-6 offset-md-3">
          <h4 style={{ lineHeight: 1.5 }} className="font-weight-light">
            Learn all the foundations you would need to be a full stack software
            engineer
          </h4>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 mb-5">
          <button className="btn btn-primary py-3 px-5">Get Started</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LandingHero
