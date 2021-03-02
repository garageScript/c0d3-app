import React, { useEffect } from 'react'
import NavLink from './NavLink'
import LoadingSpinner from './LoadingSpinner'
import { Button } from './theme/Button'
import { DropdownMenu } from './DropdownMenu'
import { useLogoutMutation, withGetApp, GetAppProps } from '../graphql'
import _ from 'lodash'

import '../scss/navbar.scss'

type AuthButtonProps = {
  initial: string
  username: string
}

type AuthLinkProps = {
  session: any
}

const dropdownMenuItems = [
  { title: 'Lessons', path: '/admin/lessons' },
  { title: 'Users', path: '/admin/users' },
  { title: 'Alerts', path: '/admin/alerts' }
]

const NavBar: React.FC<AuthLinkProps> = ({ session }) => {
  const isAdmin = _.get(session, 'user.isAdmin', '')
  return (
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
        external
      >
        Repo
      </NavLink>
      <NavLink
        path="https://www.notion.so/Table-of-Contents-a83980f81560429faca3821a9af8a5e2"
        className="nav-item nav-link"
        external
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
      {isAdmin === 'true' && (
        <DropdownMenu title="Admin" items={dropdownMenuItems} />
      )}
    </div>
  )
}

const AuthButton: React.FC<AuthButtonProps> = ({ initial, username }) => {
  const [logoutUser, { data }] = useLogoutMutation()
  useEffect(() => {
    const success = _.get(data, 'logout.success', false)
    if (success) {
      window.location.pathname = '/'
    }
  }, [data])
  return (
    <div className="d-flex">
      <NavLink
        path="/profile/[username]"
        as={`/profile/${username}`}
        className="btn btn-secondary border overflow-hidden p-2 text-truncate"
      >
        {`${initial} ${username}`}
      </NavLink>

      <Button border ml="2" onClick={logoutUser}>
        Logout
      </Button>
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

const AppNav: React.FC<GetAppProps> = ({ data: { loading, session } }) => {
  const renderButtons = () => {
    if (!session || _.get(session, 'user.username') === null)
      return <UnAuthButton />

    const initial = ''
    // TODO: replace with typing
    const username = _.get(session, 'user.username', '')

    return <AuthButton username={username} initial={initial} />
  }

  if (loading) return <LoadingSpinner />
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
            <NavBar session={session} />
          </div>
        </div>
        {renderButtons()}
      </div>
    </nav>
  )
}

export default withGetApp()(AppNav)
