import * as React from 'react'
import '../scss/navbar.scss'

const LandingNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
      <a className="navbar-brand text-primary font-weight-bold" href="#">
        C0D3
      </a>
      <div className="" id="navbarNav">
        <div className="navbar-nav collapse navbar-collapse">
          <a className="nav-item nav-link active" href="#">
            Home <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="#">
            Why Us?
          </a>
          <a className="nav-item nav-link" href="#">
            Journey
          </a>
          <a className="nav-item nav-link" href="#">
            Contact Us
          </a>
        </div>
      </div>
      <div>
        <button className="btn border mr-3">Login</button>
        <button className="btn btn-primary">Join Waitlist</button>
      </div>
    </nav>
  )
}

export default LandingNav
