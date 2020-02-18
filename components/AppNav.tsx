import * as React from 'react'
import Link from 'next/link'

import '../scss/navbar.scss'
import AuthLink from './util/AuthLink'
import UnAuthLink from './util/UnAuthLink'
import AuthButton from './util/AuthButton'
import UnAuthButton from './util/UnAuthButton'

type Props = {
  loggedIn?: boolean
  username?: string
  firstName?: string
  lastName?: string
}

const AppNav: React.FC<Props> = ({
  loggedIn = false,
  username,
  firstName,
  lastName
}) => {
  const initial = firstName && lastName ? firstName[0] + lastName[0] : null

  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-white">
      <div className="container">
        <Link href="/#">
          <a className="navbar-brand text-primary font-weight-bold">C0D3</a>
        </Link>
        <div id="navbarNav">
          <div className="navbar-nav collapse navbar-collapse">
            {loggedIn ? <AuthLink /> : <UnAuthLink />}
          </div>
        </div>
        {loggedIn ? (
          <AuthButton initial={initial || ''} username={username || ''} />
        ) : (
          <UnAuthButton />
        )}
      </div>
    </nav>
  )
}

export default AppNav
