import * as React from 'react'
import Link from 'next/link'
import '../scss/navbar.scss'

const LandingNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-white">
      <div className="container">
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
            <a className="nav-item nav-link" href="https://chat.c0d3.com">
              Help
            </a>
          </div>
        </div>
        <div>
          <Link href="/login">
            <a className="btn btn-secondary border mr-3">Login</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default LandingNav
