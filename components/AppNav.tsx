import * as React from 'react'
import Link from 'next/link'

import '../scss/navbar.scss'
import Button from './Button'

type AuthButtonProps = {
  initial: string
  username: string
}

type Props = {
  loggedIn?: boolean
  username?: string
  firstName?: string
  lastName?: string
}

const AuthLink = () => (
  <div className="navbar-nav collapse navbar-collapse">
    <a href="#" className="nav-item nav-link active">
      Curriculum <span className="sr-only">(current)</span>
    </a>
    <a href="#" className="nav-item nav-link">
      Repo
    </a>
    <a href="#" className="nav-item nav-link">
      Journey
    </a>
    <a href="https://chat.c0d3.com" className="nav-item nav-link">
      Help
    </a>
  </div>
)

const AuthButton: React.FC<AuthButtonProps> = ({ initial, username }) => (
  <div>
    <Button
      btnType="border btn-secondary overflow-hidden p-2 text-truncate"
      initial={initial}
      text={username ?? ''}
    />
    <Button text="Logout" btnType="border btn-secondary ml-2" />
  </div>
)

const UnAuthButton = () => (
  <div>
    <Link href="#/login">
      <a className="btn btn-secondary border mr-3">Login</a>
    </Link>
  </div>
)

const UnAuthLink = () => (
  <div className="navbar-nav collapse navbar-collapse">
    <Link href="/#">
      <a className="nav-item nav-link active">
        Home <span className="sr-only">(current)</span>
      </a>
    </Link>
    <Link href="/#learning">
      <a className="nav-item nav-link">Learning Process</a>
    </Link>
    <a href="https://c0d3.com/book" className="nav-item nav-link">
      Resources
    </a>
    <a href="https://chat.c0d3.com" className="nav-item nav-link">
      Help
    </a>
  </div>
)

const AppNav: React.FC<Props> = ({
  loggedIn = false,
  username,
  firstName,
  lastName
}) => {
  const initial = firstName && lastName ? firstName[0] + lastName[0] : null

  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-white">
      <div className="container">
        <Link href="/#">
          <a className="navbar-brand text-primary font-weight-bold">C0D3</a>
        </Link>
        <div id="navbarNav">
          <div className="navbar-nav collapse navbar-collapse">
            {loggedIn ? <AuthLink /> : <UnAuthLink />}
          </div>
        </div>
        {loggedIn ? (
          <AuthButton initial={initial || ''} username={username || ''} />
        ) : (
          <UnAuthButton />
        )}
      </div>
    </nav>
  )
}

export default AppNav
