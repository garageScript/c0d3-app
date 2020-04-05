import React from 'react'
import Link from 'next/link'

import Card from '../../components/Card'
import Layout from '../../components/Layout'

const success: React.FC = () => {
  return (
    <Layout>
      <Card success title="Account created successfully!">
        <Link href="/curriculum">
          <a className="btn btn-primary btn-lg mb-3"> Continue to Curriculum</a>
        </Link>
      </Card>
    </Layout>
  )
}

export default success
