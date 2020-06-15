import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="mt-4 card border-0 shadow-sm">
      <div className="card-body d-flex flex-column align-items-center">
        <h1>Loading</h1>
        <div className="spinner-border text-primary mt-1" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
