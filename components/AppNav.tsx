import * as React from 'react'
import Link from 'next/link'

import Button from './Button'
import '../scss/navbar.scss'

type Props = {
  loggedIn: boolean
  username?: string
  firstName?: string
  lastName?: string
}

const AppNav: React.FC<Props> = ({
  loggedIn,
  username,
  firstName,
  lastName
}) => {
  const initial = firstName && lastName ? firstName[0] + lastName[0] : null

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
      <a className="nav-item nav-link" href="https://c0d3.com/book">
        Resources
      </a>
      <a className="nav-item nav-link" href="https://chat.c0d3.com">
        Help
      </a>
    </div>
  )

  const AuthLink = () => (
    <div className="navbar-nav collapse navbar-collapse">
      <a className="nav-item nav-link active" href="#">
        Curriculum <span className="sr-only">(current)</span>
      </a>
      <a className="nav-item nav-link" href="#">
        Repo
      </a>
      <a className="nav-item nav-link" href="#">
        Journey
      </a>
      <a className="nav-item nav-link" href="https://chat.c0d3.com">
        Help
      </a>
    </div>
  )

  const UnAuthButton = () => (
    <div>
      <Link href="/login">
        <a className="btn btn-secondary border mr-3">Login</a>
      </Link>
    </div>
  )

  const AuthButton = () => (
    <div>
      <Button
        btnType="border btn-secondary overflow-hidden p-2 text-truncate"
        initial={initial}
        text={username ?? ''}
      />
      <Button text="Logout" btnType="border btn-secondary ml-2" />
    </div>
  )

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
        {loggedIn ? <AuthButton /> : <UnAuthButton />}
      </div>
    </nav>
  )
}

export default AppNav
