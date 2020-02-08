import * as React from 'react'
import Link from 'next/link'
import '../scss/navbar.scss'

const LandingNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
      <a className="navbar-brand text-primary font-weight-bold" href="#">
        C0D3
      </a>
      <div id="navbarNav">
        <div className="navbar-nav collapse navbar-collapse">
          <a className="nav-item nav-link active" href="#">
            Home <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="#learning">
            Learning Process
          </a>
          <a className="nav-item nav-link" href="#journey">
            Journey
          </a>
          <a className="nav-item nav-link" href="#">
            Contact Us
          </a>
        </div>
      </div>
      <div>
        <Link href="/login">
          <a className="btn border mr-3">Login</a>
        </Link>
      </div>
    </nav>
  )
}

export default LandingNav
