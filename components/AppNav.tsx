import React, { useEffect, useState } from 'react'
import NavLink, { NavLinkProps } from './NavLink'
import { useRouter } from 'next/router'
import { DropdownMenu } from './DropdownMenu'
import { useGetAppQuery, GetAppQuery } from '../graphql'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from 'react-bootstrap'
import _ from 'lodash'
import styles from '../scss/appNav.module.scss'
import { Button } from './theme/Button'
import LogoutContainer from './LogoutContainer'
import { useSession } from 'next-auth/react'
import { Session } from '../@types/auth'

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
  const location = router.asPath
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
      {isAdmin && (
        <DropdownMenu
          title="Admin"
          items={dropdownMenuItems}
          bsPrefix={styles['dropdown-item']}
        />
      )}
    </>
  )
}

const LoggedInAuthNav: React.FC<{ username: string }> = ({ username }) => {
  const capitalized = username.charAt(0).toUpperCase() + username.slice(1)

  return (
    <div className={`${styles['nav-buttons']}`}>
      <NavLink
        path="/profile/[username]"
        as={`/profile/${username}`}
        className="btn btn-light border overflow-hidden text-truncate"
      >
        {capitalized}
      </NavLink>

      <LogoutContainer>
        <div className={`${styles['light-button']} d-inline`}>
          <Button border ml="2" type="light">
            Logout
          </Button>
        </div>
      </LogoutContainer>
    </div>
  )
}

const NotLoggedInAuthNav = () => (
  <div className={`${styles['nav-buttons']}`}>
    <NavLink path="/login" className="btn btn-light border m-2 me-lg-3">
      Login
    </NavLink>
    <NavLink path="/signup" className="btn btn-light border m-2 me-lg-3">
      Signup
    </NavLink>
  </div>
)

const AppNav: React.FC<{}> = () => {
  const { data: session, status } = useSession() as unknown as {
    data: Session
    status: 'loading' | 'authenticated' | 'unauthenticated'
  }

  // const { data, loading } = useGetAppQuery()

  const renderButtons = () => {
    if (status === 'loading') return <></>

    if (!session || _.get(session, 'user.username', null) === null) {
      return <NotLoggedInAuthNav />
    }

    // TODO: replace with typing
    const username = session.user.username

    return <LoggedInAuthNav username={username} />
  }

  return (
    <Navbar expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="/">
          <div className={`${styles['navbar-brand']} text-primary fw-bold`}>
            C0D3
          </div>
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
