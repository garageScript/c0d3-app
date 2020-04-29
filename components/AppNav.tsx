import * as React from 'react'
import NavLink from './NavLink'
import Button from './Button'

import styles from '../scss/navbar.module.scss'

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
      path="/curriculum"
      activePath="/curriculum"
      className={`${styles['nav-item']} nav-link`}
    >
      Curriculum
    </NavLink>
    <NavLink path="#" className={`${styles['nav-item']} nav-link`}>
      Repo
    </NavLink>
    <NavLink path="#" className={`${styles['nav-item']} nav-link`}>
      Journey
    </NavLink>
    <NavLink
      path="https://chat.c0d3.com"
      className={`${styles['nav-item']} nav-link`}
      external
    >
      Help
    </NavLink>
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
    <NavLink path="/login" className="btn btn-secondary border mr-3">
      Login
    </NavLink>
    <NavLink path="/signup" className="btn btn-secondary border mr-3">
      Signup
    </NavLink>
  </div>
)

const UnAuthLink = () => (
  <div className="navbar-nav collapse navbar-collapse">
    <NavLink
      path="/"
      activePath="/"
      className={`${styles['nav-item']} nav-link`}
    >
      Home
    </NavLink>
    <NavLink path="/#learning" className={`${styles['nav-item']} nav-link`}>
      Learning Process
    </NavLink>
    <NavLink
      path="https://c0d3.com/book"
      className={`${styles['nav-item']} nav-link`}
      external
    >
      Resources
    </NavLink>
    <NavLink
      path="https://chat.c0d3.com"
      className={`${styles['nav-item']} nav-link`}
      external
    >
      Help
    </NavLink>
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
          path="/"
          className={`${styles['navbar-brand']} text-primary font-weight-bold`}
        >
          C0D3
        </NavLink>
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
