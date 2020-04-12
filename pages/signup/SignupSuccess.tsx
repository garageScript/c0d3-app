// import libraries
import React from 'react'

// import library components
import Link from 'next/link'

// import components
import Card from '../../components/Card'

const SignupSuccess: React.FC = () => (
  <Card success title="Account created successfully!">
    <Link href="/curriculum">
      <a className="btn btn-primary btn-lg mb-3"> Continue to Curriculum</a>
    </Link>
  </Card>
)

export default SignupSuccess
