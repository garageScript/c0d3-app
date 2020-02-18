import * as React from 'react'
import Link from 'next/link'

const UnAuthLink = () => (
  <div className="navbar-nav collapse navbar-collapse">
    <Link href="/#">
      <a className="nav-item nav-link active">
        Home <span className="sr-only">(current)</span>
      </a>
    </Link>
    <Link href="/#learning">
      <a className="nav-item nav-link">Learning Process</a>
    </Link>
    <a href="https://c0d3.com/book" className="nav-item nav-link">
      Resources
    </a>
    <a href="https://chat.c0d3.com" className="nav-item nav-link">
      Help
    </a>
  </div>
)

export default UnAuthLink
