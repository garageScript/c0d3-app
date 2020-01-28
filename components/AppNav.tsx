import * as React from 'react'
import Button from './Button'

const AppNav: React.FC = () => {
  return (
    <nav className="nav">
      <h1>C0D3</h1>
      <div>
        <a href="#">Home</a>
        <a href="#">Why Us?</a>
        <a href="#">Journey</a>
        <a href="#">Help</a>
      </div>
      <div>
        <Button>Login</Button>
        <Button style="dark">Join Waitlist</Button>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-size: 1.4rem;
          margin-top: 25px;
          margin-bottom: 25px;
        }
        h1 {
          font-family: 'PT Mono', sans-serif;
          font-size: 2.8rem;
          margin-top: 0;
          margin-bottom: 0;
          color: rgb(84, 64, 216);
        }
        a {
          text-decoration: none;
          color: rgb(160, 160, 160);
          margin-left: 5em;
        }
      `}</style>
    </nav>
  )
}

export default AppNav
