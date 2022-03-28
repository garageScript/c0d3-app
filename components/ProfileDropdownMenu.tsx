import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import styles from '../scss/dropDown.module.scss'
import UserInfoImage from './UserInfoImage'
import { ChevronDownIcon } from '@primer/octicons-react'
import LogoutContainer from './LogoutContainer'
import { Button } from './theme/Button'
import { UserInfo } from '../@types/user'
import { useUserInfoQuery } from '../graphql/index'
import { useRouter } from 'next/router'
import _ from 'lodash'

//a null item indicates a dropdown divider

type DropDownMenuProps = {
  username: string
  isAdmin: boolean
}

type CustomToggleProps = {
  children?: React.ReactNode
  className?: string | undefined
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}
}

const ProfileDropdownMenu: React.FC<DropDownMenuProps> = ({
  username,
  isAdmin
}) => {
  const { data } = useUserInfoQuery({
    variables: { username },
    skip: !username
  })
  const location = useRouter().asPath

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

  const dropdownAdminMenuItems = [
    { title: 'Lessons', path: '/admin/lessons' },
    { title: 'Users', path: '/admin/users' },
    { title: 'Alerts', path: '/admin/alerts' }
  ]

  const adminDropdownMenu = dropdownAdminMenuItems.map(({ title, path }) => (
    <Dropdown.Item
      className={
        location === path
          ? `${styles['dropdown-item']} ${styles['active']} nav-link `
          : `${styles['dropdown-item']} nav-link `
      }
      href={path}
      key={title}
    >
      {title}
    </Dropdown.Item>
  ))

  const buttonMenuToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLDivElement>) => (
      <div
        ref={ref}
        className={props.className}
        onClick={e => {
          props.onClick(e)
        }}
      >
        {props.children}
      </div>
    )
  )

  return (
    <Dropdown>
      <div className="d-none d-lg-block">
        <Dropdown.Toggle
          as={buttonMenuToggle}
          className={`${styles['nav-user-toggle']} `}
          id="user_nav_toggle"
        >
          <UserInfoImage user={userInfo} className={`${styles['user-icon']}`} />
          <span>{username}</span>
          <ChevronDownIcon size={16} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={`${styles['dropdown-menu']}`} align="end">
          {isAdmin && (
            <>
              <Dropdown.Header>ADMIN</Dropdown.Header>
              {adminDropdownMenu}
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
        {adminDropdownMenu}
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
  )
}

export default ProfileDropdownMenu
