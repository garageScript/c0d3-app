import React from 'react'
import Link from 'next/link'

export type NavLinkProps = {
  path: string
  activePath?: boolean
  external?: true
  as?: string
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  path,
  activePath,
  as,
  external,
  className = ''
}) => {
  if (!path) return null
  if (activePath) className += ' active'
  if (external) {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={path}
        className={className}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={path} as={as}>
      <a className={className}>
        {activePath && <span className="sr-only">(current)</span>}
        {children}
      </a>
    </Link>
  )
}

export default NavLink
