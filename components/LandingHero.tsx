import * as React from 'react'

const LandingHero = () => {
  return (
    <div className="container text-center">
      <div className="row justify-center mt-5">
        <div className="col-md-6 offset-md-3">
          <img src="https://dummyimage.com/325x361/000/fff"></img>
        </div>
      </div>
      <div className="row justify-center mt-5">
        <div className="col-md-8 offset-md-2">
          <h1 style={{ fontWeight: 900 }} className="display-4 md-display-3">
            Learn Javascript the old school way
          </h1>
        </div>
      </div>
      <div className="row justify-center mt-3">
        <div className="col-md-8 offset-md-2">
          <h4>
            Learn all the foundations you need to be a full stack software
            engineer
          </h4>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <button className="btn btn-primary py-2 px-4">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default LandingHero
