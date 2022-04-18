import React from 'react'
import Link from 'next/link'
import styles from '../scss/navLink.module.scss'
import appNavStyles from '../scss/appNav.module.scss'

export type NavLinkProps = {
  path: string
  activePath?: boolean
  external?: true
  as?: string
  className?: string
  hoverUnderline?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  path,
  activePath,
  as,
  external,
  className = '',
  hoverUnderline = false
}) => {
  if (!path) return null
  if (activePath) className += ` ${appNavStyles['active']}`
  if (external || path[0] !== '/') {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={path}
        className={`${className} ${
          styles[hoverUnderline ? 'link' : 'noUnderline']
        }`}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={path} as={as}>
      <a
        className={`${className} ${
          styles[hoverUnderline ? 'link' : 'noUnderline']
        }`}
      >
        {activePath && <span className="visually-hidden">(current)</span>}
        {children}
      </a>
    </Link>
  )
}

export default NavLink
