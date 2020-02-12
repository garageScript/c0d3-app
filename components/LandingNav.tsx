import * as React from 'react'
import Link from 'next/link'
import '../scss/navbar.scss'

const LandingNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-white">
      <div className="container">
        <Link href="/#">
          <a className="navbar-brand text-primary font-weight-bold">C0D3</a>
        </Link>
        <div id="navbarNav">
          <div className="navbar-nav collapse navbar-collapse">
            <Link href="/#">
              <a className="nav-item nav-link active">
                Home <span className="sr-only">(current)</span>
              </a>
            </Link>
            <Link href="/#learning">
              <a className="nav-item nav-link">Learning Process</a>
            </Link>
            <Link href="/#journey">
              <a className="nav-item nav-link">Journey</a>
            </Link>
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
