import * as React from 'react'
import Button from './NavButton'
import './styles/AppNav.css'

const AppNav: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">C0D3</h1>
      <div className="hidden md:block">
        <a className="navbar__link" href="#">
          Home
        </a>
        <a className="navbar__link" href="#choice">
          Why Us?
        </a>
        <a className="navbar__link" href="#journey">
          Journey
        </a>
        <a className="navbar__link" href="#contact">
          Contact Us
        </a>
      </div>
      <div>
        <Button>Login</Button>
        <Button style="dark">Join Waitlist</Button>
      </div>
    </nav>
  )
}

export default AppNav
