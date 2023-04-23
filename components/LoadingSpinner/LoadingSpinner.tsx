import React from 'react'

const LoadingSpinner = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1
      }}
      className="container-fluid bg-primary d-flex flex-column justify-content-center align-items-center"
    >
      <h1
        className="text-white fw-bold display-3"
        style={{ fontFamily: "'PT Mono', sans-serif" }}
      >
        C0D3
      </h1>
      <div className="spinner-border text-white" role="status">
        <h1 className="visually-hidden">Loading...</h1>
      </div>
    </div>
  )
}

export default LoadingSpinner
