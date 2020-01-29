import * as React from 'react'
import Button from './NavButton'

const AppNav: React.FC = () => {
  return (
    <nav className="nav flex flex-wrap justify-between items-center h-auto my-0 w-full p-4">
      <h1 className="ml-8">C0D3</h1>
      <div className="hidden lg:block">
        <a className="desktop" href="#">
          Home
        </a>
        <a className="desktop" href="#choice">
          Why Us?
        </a>
        <a className="desktop" href="#journey">
          Journey
        </a>
        <a className="desktop" href="#contact">
          Contact Us
        </a>
      </div>
      <div className="sm:mr-4">
        <Button>Login</Button>
        <Button style="dark">Join Waitlist</Button>
      </div>
      <style jsx>{`
        nav {
          font-size: 1.4rem;
        }
        h1 {
          font-family: 'PT Mono', sans-serif;
          font-size: 2.8rem;
          margin-top: 0;
          margin-bottom: 0;
          color: rgb(84, 64, 216);
        }
        .desktop {
          text-decoration: none;
          color: rgb(160, 160, 160);
          margin-left: 5em;
        }
      `}</style>
    </nav>
  )
}

export default AppNav
