import React from 'react'
import Link from 'next/link'

type NavLinkProps = {
  path: string
  activePath?: string
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
  const active = path === activePath
  if (active) {
    className += ' active'
  }
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
        {active && <span className="sr-only">(current)</span>}
        {children}
      </a>
    </Link>
  )
}

export default NavLink
