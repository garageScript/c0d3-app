import * as React from 'react'
import Link from 'next/link'

import '../scss/navbar.scss'
import Button from './Button'

import { AuthUserContext, RouterContext } from '../pages/_app'

type LinkProps = {
  active?: string
}

type AuthButtonProps = {
  initial?: string
  username: string
}

const AuthLinks: React.FC<LinkProps> = ({ active }) => (
  <div className="navbar-nav collapse navbar-collapse">
    <a href="/curriculum" className={`nav-item nav-link${(active === '/curriculum') ? ' active': ''}`}>
      Curriculum <span className="sr-only">(current)</span>
    </a>
    <a href="#" className={`nav-item nav-link${(active === '#') ? ' active': ''}`}>
      Repo
    </a>
    <a href="#" className={`nav-item nav-link${(active === '#') ? ' active': ''}`}>
      Journey
    </a>
    <a
      href="https://chat.c0d3.com"
      className="nav-item nav-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Help
    </a>
  </div>
)

const UnAuthLinks: React.FC<LinkProps> = ({ active }) => (
  <div className="navbar-nav collapse navbar-collapse">
    <Link href="/">
      <a className={`nav-item nav-link${(active === '/') ? ' active': ''}`}>
        Home <span className="sr-only">(current)</span>
      </a>
    </Link>
    <Link href="/#learning">
      <a className={`nav-item nav-link${(active === '/#learning') ? ' active': ''}`}>Learning Process</a>
    </Link>
    <a
      className="nav-item nav-link"
      href="https://c0d3.com/book"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resources
    </a>
    <a
      className="nav-item nav-link"
      href="https://chat.c0d3.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Help
    </a>
  </div>
)

const AuthButton: React.FC<AuthButtonProps> = ({ initial, username }) => (
  <div>
    <Button
      btnType="border btn-secondary overflow-hidden p-2 text-truncate"
      initial={initial}
      text={username}
    />
    <Button text="Logout" btnType="border btn-secondary ml-2" />
  </div>
)

const UnAuthButton = () => (
  <div>
    <Link href="/login">
      <a className="btn btn-secondary border mr-3">Login</a>
    </Link>
    <Link href="/signup">
      <a className="btn btn-secondary border mr-3">Signup</a>
    </Link>
  </div>
)

const AppNav: React.FC = () => {
  return (
    <RouterContext.Consumer>
      {router => {
        return (
          <AuthUserContext.Consumer>
            {user => {
              return (
                <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-white">
                  <div className="container">
                    <Link href="/">
                      <a className="navbar-brand text-primary font-weight-bold">
                        C0D3
                      </a>
                    </Link>
                    <div id="navbarNav">
                      <div className="navbar-nav collapse navbar-collapse">
                        {user ? <AuthLinks active={router.route} /> : <UnAuthLinks active={router.route} />}
                      </div>
                    </div>
                    {user ? (
                      <AuthButton username={user.username} />
                    ) : (
                      <UnAuthButton />
                    )}
                  </div>
                </nav>
              )
            }}
          </AuthUserContext.Consumer>
        )
      }}
    </RouterContext.Consumer>
  )
}

export default AppNav
