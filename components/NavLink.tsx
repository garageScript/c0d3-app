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
  className
}) => {
  const active = path === activePath
  const hasClass = typeof className !== 'undefined'
  if (external) {
    if (hasClass) {
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
      <a rel="noopener noreferrer" target="_blank" href={path}>
        {children}
      </a>
    )
  }
  if (hasClass) {
    return (
      <Link href={path} as={as}>
        <a className={`${className} ${active ? 'active' : ''}`}>
          {active && <span className="sr-only">(current)</span>}
          {children}
        </a>
      </Link>
    )
  }
  return (
    <Link href={path} as={as}>
      <a className={`${active ? 'active' : ''}`}>
        {active && <span className="sr-only">(current)</span>}
        {children}
      </a>
    </Link>
  )
}

export default NavLink
