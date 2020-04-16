import React from 'react'
import Link from 'next/link'

type NavLinkProps = {
  text: string
  path: string
  activePath?: string
  as?: string
  internal?: true
  blank?: true
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({
  text,
  path,
  activePath,
  as,
  internal,
  blank,
  className
}) => {
  const active = path === activePath
  className = className ? className : ''
  if (internal) {
    return (
      <Link href={path} as={as}>
        <a className={`${className} ${active ? 'active' : ''}`}>
          {text}
          {active && <span className="sr-only">(current)</span>}
        </a>
      </Link>
    )
  }
  if (blank) {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={path}
        className={className}
      >
        {text}
      </a>
    )
  }
  return (
    <a href={path} className={`${className} ${active ? 'active' : ''}`}>
      {text}
    </a>
  )
}

export default NavLink
