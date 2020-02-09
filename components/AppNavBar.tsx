import * as React from 'react'
import Button from './Button'

const AppNavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <a href="#" className="navbar-brand text-primary font-weight-bold">
        C0D3
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
        </ul>
      </div>
      <Button color="secondary" initial="SZ" text="Song" />
      <Button color="secondary" text="Logout" />
    </nav>
  )
}

export default AppNavBar
