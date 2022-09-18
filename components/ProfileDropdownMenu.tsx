import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import UserInfoImage from './UserInfoImage'
import { ChevronDownIcon } from '@primer/octicons-react'
import LogoutContainer from './LogoutContainer'
import { Button } from './theme/Button'
import { UserInfo } from '../@types/user'
import { useUserInfoQuery } from '../graphql/index'
import { useRouter } from 'next/router'
import _ from 'lodash'
import styles from '../scss/profileDropDown.module.scss'
import { ADMIN_PATH, PROFILE_PATH } from '../constants'

type ProfileDropDownMenuProps = {
  username: string
  isAdmin: boolean
}

const ProfileDropdownMenu: React.FC<ProfileDropDownMenuProps> = ({
  username,
  isAdmin
}) => {
  const { data } = useUserInfoQuery({
    variables: { username },
    skip: !username
  })
  const router = useRouter()
  const location = router.asPath
  const userProfilePath = PROFILE_PATH + '/' + username

  const fullname = _.get(data, 'userInfo.user.name', '')

  const userInfo: UserInfo = {
    // 'A' stands for Anonymous, in case user did not put in full name
    username,
    firstName: fullname.split(' ')[0] || 'A',
    lastName: fullname.split(' ')[1] || ' ',
    discordUserId: _.get(data, 'userInfo.user.discordUserId', ''),
    discordUsername: _.get(data, 'userInfo.user.discordUsername', ''),
    discordAvatarUrl: _.get(data, 'userInfo.user.discordAvatarUrl', '')
  }

  const dropdownAdminMenuItems = [
    { title: 'Lessons', path: ADMIN_PATH + '/lessons' },
    { title: 'Users', path: ADMIN_PATH + '/users' },
    { title: 'Alerts', path: ADMIN_PATH + '/alerts' }
  ]

  const isActive = (path: string) => {
    if (path === location) return `${styles['active']}`
    return ''
  }

  const adminDropdownMenu = dropdownAdminMenuItems.map(({ title, path }) => (
    <Dropdown.Item
      className={`${styles['dropdown-item']}`}
      href={path}
      key={title}
      bsPrefix={isActive(path)}
    >
      {title}
    </Dropdown.Item>
  ))

  const buttonMenuToggle = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'>
  >((props, ref) => <button ref={ref} {...props}></button>)

  return (
    <Dropdown role="menu">
      <div className="d-none d-lg-block">
        <Dropdown.Toggle
          data-testid="user-info-image"
          as={buttonMenuToggle}
          className={`${styles['nav-user-toggle']} `}
          id="user_nav_toggle"
        >
          <UserInfoImage user={userInfo} className={`${styles['user-icon']}`} />
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
            className={`${styles['dropdown-item']} `}
            bsPrefix={isActive(userProfilePath)}
            href={userProfilePath}
          >
            Profile
          </Dropdown.Item>
          <LogoutContainer>
            <Dropdown.Item className={`${styles['dropdown-item']}`}>
              Logout
            </Dropdown.Item>
          </LogoutContainer>
        </Dropdown.Menu>
      </div>
      <div className="d-lg-none">
        {adminDropdownMenu}
        <Dropdown.Item
          className={`${styles['dropdown-item']}`}
          bsPrefix={isActive(userProfilePath)}
          href={userProfilePath}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item className={`${styles['dropdown-item']} `}>
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
