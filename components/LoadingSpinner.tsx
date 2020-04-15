import React from 'react'
import Layout from './Layout'

const LoadingSpinner = () => {
  return (
    <Layout>
      <div className="mt-4 card border-0 shadow-sm">
        <div className="card-body d-flex flex-column align-items-center">
          <h1>Loading</h1>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoadingSpinner
