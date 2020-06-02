import React, { useEffect } from 'react'
import NavLink from './NavLink'
import Button from './Button'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT_USER } from '../graphql/queries'
import _ from 'lodash'

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
      path="/curriculum"
      activePath="/curriculum"
      className="nav-item nav-link"
    >
      Curriculum
    </NavLink>
    <NavLink
      path="https://github.com/garageScript/c0d3-app"
      className="nav-item nav-link"
    >
      Repo
    </NavLink>
    <NavLink
      path="https://www.notion.so/Table-of-Contents-a83980f81560429faca3821a9af8a5e2"
      className="nav-item nav-link"
    >
      Journey
    </NavLink>
    <NavLink
      path="https://chat.c0d3.com"
      className="nav-item nav-link"
      external
    >
      Help
    </NavLink>
    <NavLink path="/contributors" className="nav-item nav-link">
      Contributors
    </NavLink>
  </div>
)

const AuthButton: React.FC<AuthButtonProps> = ({ initial, username }) => {
  const [logoutUser, { data }] = useMutation(LOGOUT_USER)
  useEffect(() => {
    const { success } = _.get(data, 'logout', false)
    if (success) {
      window.location.pathname = '/'
    }
  }, [data])
  return (
    <div>
      <Button
        btnType="border btn-secondary overflow-hidden p-2 text-truncate"
        initial={initial}
        text={username}
      />
      <Button
        text="Logout"
        btnType="border btn-secondary ml-2"
        onClick={logoutUser}
      />
    </div>
  )
}

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
    <NavLink path="/" activePath="/" className="nav-item nav-link">
      Home
    </NavLink>
    <NavLink path="/#learning" className="nav-item nav-link">
      Learning Process
    </NavLink>
    <NavLink
      path="https://c0d3.com/book"
      className="nav-item nav-link"
      external
    >
      Resources
    </NavLink>
    <NavLink
      path="https://chat.c0d3.com"
      className="nav-item nav-link"
      external
    >
      Help
    </NavLink>
    <NavLink path="/contributors" className="nav-item nav-link">
      Contributors
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
          className="navbar-brand text-primary font-weight-bold"
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
