import * as React from 'react'
import Link from 'next/link'

const UnAuthButton = () => (
  <div>
    <Link href="/login">
      <a className="btn btn-secondary border mr-3">Login</a>
    </Link>
  </div>
)

export default UnAuthButton
