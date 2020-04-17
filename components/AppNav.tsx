import * as React from 'react'
import NavLink from './NavLink'
import Button from './Button'

import '../scss/navbar.scss'

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
    <NavLink
      text="Curriculum"
      path="/curriculum"
      activePath="/curriculum"
      className="nav-item nav-link"
    />
    <NavLink text="Repo" path="#" className="nav-item nav-link" />
    <NavLink text="Journey" path="#" className="nav-item nav-link" />
    <NavLink
      text="Help"
      path="https://chat.c0d3.com"
      className="nav-item nav-link"
      external
      blank
    />
  </div>
)

const AuthButton: React.FC<AuthButtonProps> = ({ initial, username }) => (
  <div>
    <Button
      btnType="border btn-secondary overflow-hidden p-2 text-truncate"
      initial={initial}
      text={username}
    />
    <Button text="Logout" btnType="border btn-secondary ml-2" />
  </div>
)

const UnAuthButton = () => (
  <div>
    <NavLink
      text="Login"
      path="/login"
      className="btn btn-secondary border mr-3"
    />
    <NavLink
      text="Signup"
      path="/signup"
      className="btn btn-secondary border mr-3"
    />
  </div>
)

const UnAuthLink = () => (
  <div className="navbar-nav collapse navbar-collapse">
    <NavLink
      text="Home"
      path="/"
      activePath="/"
      className="nav-item nav-link"
    />
    <NavLink
      text="Learning Process"
      path="/#learning"
      className="nav-item nav-link"
    />
    <NavLink
      text="Resources"
      path="https://c0d3.com/book"
      className="nav-item nav-link"
      external
      blank
    />
    <NavLink
      text="Help"
      path="https://chat.c0d3.com"
      className="nav-item nav-link"
      external
      blank
    />
  </div>
)

const AppNav: React.FC<Props> = ({
  loggedIn = false,
  username = '',
  firstName,
  lastName
}) => {
  const initial = firstName && lastName ? firstName[0] + lastName[0] : ''
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-white">
      <div className="container">
        <NavLink
          text="C0D3"
          path="/"
          className="navbar-brand text-primary font-weight-bold"
        />
        <div id="navbarNav">
          <div className="navbar-nav collapse navbar-collapse">
            {loggedIn ? <AuthLink /> : <UnAuthLink />}
          </div>
        </div>
        {loggedIn ? (
          <AuthButton initial={initial} username={username} />
        ) : (
          <UnAuthButton />
        )}
      </div>
    </nav>
  )
}

export default AppNav
