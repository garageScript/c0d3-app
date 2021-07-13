import React, { useEffect, useState } from 'react'
import NavLink, { NavLinkProps } from './NavLink'
import { Button } from './theme/Button'
import { useRouter } from 'next/router'
import { DropdownMenu } from './DropdownMenu'
import { useLogoutMutation, useGetAppQuery, GetAppQuery } from '../graphql'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from 'react-bootstrap'
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
    <>
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
    </>
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
    <div className={`${styles['nav-buttons']}`}>
      <NavLink
        path="/profile/[username]"
        as={`/profile/${username}`}
        className="btn btn-secondary border overflow-hidden text-truncate"
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
  <div className={`${styles['nav-buttons']}`}>
    <NavLink path="/login" className="btn btn-secondary border m-2 mr-lg-3">
      Login
    </NavLink>
    <NavLink path="/signup" className="btn btn-secondary border m-2 mr-lg-3">
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
    <Navbar expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="#home">
          <NavLink
            path="/"
            className={`${styles['navbar-brand']} text-primary font-weight-bold`}
          >
            C0D3
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="m-auto">
            <NavBar session={session} />
          </Nav>
          {renderButtons()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNav
