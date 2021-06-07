import React, { useEffect, useState } from 'react'
import NavLink, { NavLinkProps } from './NavLink'
import { Button } from './theme/Button'
import { useRouter } from 'next/router'
import { DropdownMenu } from './DropdownMenu'
import { useLogoutMutation, useGetAppQuery, GetAppQuery } from '../graphql'
import _ from 'lodash'
import styles from '../scss/appNav.module.scss'

type AuthButtonProps = {
  initial: string
  username: string
}

type AuthLinkProps = {
  session: any
}

type NavItem = NavLinkProps & { name: string }

const dropdownMenuItems = [
  { title: 'Lessons', path: '/admin/lessons' },
  { title: 'Users', path: '/admin/users' },
  { title: 'Alerts', path: '/admin/alerts' }
]
const navItems: NavItem[] = [
  { path: '/curriculum', name: 'Curriculum' },
  {
    path: 'https://github.com/garageScript/c0d3-app',
    name: 'Repo',
    external: true
  },
  {
    path: '/docs/learn',
    name: 'Learn'
  },
  {
    path: 'https://discord.gg/c0d3',
    name: 'Community',
    external: true
  }
]

const NavBar: React.FC<AuthLinkProps> = ({ session }) => {
  const router = useRouter()
  const isAdmin = _.get(session, 'user.isAdmin', false) as boolean
  const location = '/' + router.asPath.split('/')[1]

  return (
    <div className="navbar-nav collapse navbar-collapse">
      {navItems.map(button => (
        <NavLink
          {...button}
          className={`${styles['nav-item']} nav-link`}
          key={button.name}
          activePath={location === button.path}
        >
          {button.name}
        </NavLink>
      ))}
      {isAdmin && <DropdownMenu title="Admin" items={dropdownMenuItems} />}
    </div>
  )
}

const AuthButton: React.FC<AuthButtonProps> = ({ initial, username }) => {
  const router = useRouter()
  const [logoutUser] = useLogoutMutation({
    update(cache) {
      cache.modify({
        fields: {
          session() {
            return { lessonStatus: [] }
          }
        },
        broadcast: false
      })
    },
    onCompleted: () => {
      window.localStorage.removeItem('loggedIn')
      router.push('/')
    }
  })
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

const AppNav: React.FC<{}> = () => {
  const [session, setSession] = useState<GetAppQuery['session']>({
    lessonStatus: []
  })
  const { data } = useGetAppQuery()
  useEffect(() => {
    if (data && data.session) {
      setSession(data.session)
    }
  }, [data])
  const renderButtons = () => {
    if (!session || _.get(session, 'user.username', null) === null) {
      return <UnAuthButton />
    }

    const initial = ''
    // TODO: replace with typing
    const username = _.get(session, 'user.username', '')

    return <AuthButton username={username} initial={initial} />
  }

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
            <NavBar session={session} />
          </div>
        </div>
        {renderButtons()}
      </div>
    </nav>
  )
}

export default AppNav
