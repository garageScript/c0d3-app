import React, { useEffect, useState } from 'react'
import NavLink, { NavLinkProps } from './NavLink'
import { useRouter } from 'next/router'
import { useGetAppQuery, GetAppQuery } from '../graphql'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, Dropdown } from 'react-bootstrap'
import _ from 'lodash'
import styles from '../scss/appNav.module.scss'
import LogoutContainer from './LogoutContainer'
import { Button } from './theme/Button'
import { UserInfo } from '../@types/user'
import { useUserInfoQuery } from '../graphql/index'
import UserInfoImage from './UserInfoImage'
import { ChevronDownIcon } from '@primer/octicons-react'

type AuthLinkProps = {
  session: any
}

type CustomToggleProps = {
  children?: React.ReactNode
  className?: String | undefined
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}
}

type NavItem = NavLinkProps & { name: string }

const dropdownAdminMenuItems = [
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

const NavBar: React.FC<AuthLinkProps> = ({}) => {
  const router = useRouter()
  const location = router.asPath

  return (
    <>
      {navItems.map(button => (
        <NavLink
          {...button}
          className={`nav-link ${styles['nav-item']} ${styles['nav-link']} button.path`}
          key={button.name}
          activePath={location === button.path}
        >
          {button.name}
        </NavLink>
      ))}
    </>
  )
}

const LoggedInAuthNav: React.FC<{ username: string; session: any }> = ({
  username,
  session
}) => {
  const isAdmin = _.get(session, 'user.isAdmin', false) as boolean
  const { data } = useUserInfoQuery({
    variables: { username },
    skip: !username
  })
  const router = useRouter()
  const location = router.asPath

  const fullname = _.get(data, 'userInfo.user.name', '')

  const userInfo: UserInfo = {
    // 'A' stands for Anonymous, in case user did not put in full name
    username,
    firstName: fullname.split(' ')[0] || 'A',
    lastName: fullname.split(' ')[1] || ' ',
    discordUserId: data?.userInfo?.user?.discordUserId ?? '',
    discordUsername: data?.userInfo?.user?.discordUsername ?? '',
    discordAvatarUrl: data?.userInfo?.user?.discordAvatarUrl ?? ''
  }

  const buttonMenuToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
      <a
        ref={ref}
        className={props.className}
        onClick={e => {
          e.preventDefault()
          if (props.onClick) props.onClick(e)
        }}
      >
        {props.children}
      </a>
    )
  )

  return (
    <div className={`${styles['nav-buttons']}`}>
      <Dropdown>
        <div className="d-none d-lg-block">
          <Dropdown.Toggle
            as={buttonMenuToggle}
            className={`${styles['nav-user-toggle']} `}
            id="user_nav_toggle"
          >
            <UserInfoImage user={userInfo} />
            <ChevronDownIcon className={`${styles['down-icon']} `} size={16} />
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles['dropdown-menu']}`} align="end">
            {isAdmin && (
              <>
                <Dropdown.Header>ADMIN</Dropdown.Header>
                {dropdownAdminMenuItems.map(({ title, path }) => (
                  <Dropdown.Item
                    className={
                      location === path
                        ? `${styles['dropdown-item']} nav-link ${styles['active']} `
                        : `${styles['dropdown-item']} nav-link `
                    }
                    href={path}
                    key={title}
                  >
                    {title}
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
              </>
            )}
            <Dropdown.Item
              className={
                location === `/profile/${username}`
                  ? `${styles['dropdown-item']} nav-link ${styles['active']} `
                  : `${styles['dropdown-item']} nav-link `
              }
              href={`/profile/${username}`}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item className={`nav-link ${styles['dropdown-item']}`}>
              <LogoutContainer>Logout</LogoutContainer>
            </Dropdown.Item>
          </Dropdown.Menu>
        </div>
        <div className="d-lg-none">
          {dropdownAdminMenuItems.map(({ title, path }) => (
            <Dropdown.Item
              className={
                location === path
                  ? `${styles['dropdown-item']} nav-link ${styles['active']} `
                  : `${styles['dropdown-item']} nav-link `
              }
              href={path}
              key={title}
            >
              {title}
            </Dropdown.Item>
          ))}
          <Dropdown.Item
            className={
              location === `/profile/${username}`
                ? `${styles['dropdown-item']} nav-link ${styles['active']} `
                : `${styles['dropdown-item']} nav-link `
            }
            href={`/profile/${username}`}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item className={`nav-link ${styles['dropdown-item']} `}>
            <LogoutContainer>
              <div className={`${styles['light-button']} d-inline`}>
                <Button border ml="2" type="light">
                  Logout
                </Button>
              </div>
            </LogoutContainer>
          </Dropdown.Item>
        </div>
      </Dropdown>
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
  const [session, setSession] = useState<GetAppQuery['session']>({
    lessonStatus: []
  })
  const isAdmin = _.get(session, 'user.isAdmin', false) as boolean

  const { data, loading } = useGetAppQuery()

  useEffect(() => {
    if (data && data.session) {
      setSession(data.session)
    }
  }, [data])

  const renderButtons = () => {
    if (loading) return <></>

    if (!session || _.get(session, 'user.username', null) === null) {
      return <NotLoggedInAuthNav />
    }

    // TODO: replace with typing
    const username = _.get(session, 'user.username', '')

    return <LoggedInAuthNav username={username} session={session} />
  }

  return (
    <Navbar className={`${styles['navbar']}`} expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="/">
          <div className={`${styles['navbar-brand']} text-primary fw-bold`}>
            C0D3
            {isAdmin ? (
              <span className={`${styles['isAdminBadge']} badge`}> ADMIN </span>
            ) : (
              ''
            )}
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
