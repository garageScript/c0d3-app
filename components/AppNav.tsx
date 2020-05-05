import * as React from 'react'
import NavLink from './NavLink'
import Button from './Button'
import logoutUser from '../helpers/logoutUser'
import { GET_APP } from '../graphql/queries'
import withQueryLoader, { WithQueryProps } from '../containers/withQueryLoader'

import '../scss/navbar.scss'

type AuthButtonProps = {
  initial: string
  username: string
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
    <NavLink path="#" className="nav-item nav-link">
      Repo
    </NavLink>
    <NavLink path="#" className="nav-item nav-link">
      Journey
    </NavLink>
    <NavLink
      path="https://chat.c0d3.com"
      className="nav-item nav-link"
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
    <Button
      text="Logout"
      btnType="border btn-secondary ml-2"
      onClick={async () => {
        const res = await logoutUser()
        if (res) window.location.pathname = '/'
      }}
    />
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
  </div>
)

const AppNav: React.FC<WithQueryProps> = ({
  queryData
}) => {
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
            {false ? <AuthLink /> : <UnAuthLink />}
          </div>
        </div>
        {false ? (
          <AuthButton initial='TS' username='TypeScript' />
        ) : (
          <UnAuthButton />
        )}
      </div>
    </nav>
  )
}

export default withQueryLoader(
  {
    query: GET_APP
  },
  AppNav
)
