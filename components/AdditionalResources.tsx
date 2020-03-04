import React from 'react'
import '../scss/additionalResources.scss'

const AdditionalResources: React.FC = () => {
  return (
    <div className="additional-resources__container mt-4 mb-0">
      <h1 className="additional-resources__title text-muted">
        ADDITIONAL RESOURCES
      </h1>
      <hr className="my-2" />
      <a className="mx-3 font-weight-bold" href="#">
        Setup Instructions
      </a>
      <hr className="my-2" />
      <a className="mx-3 font-weight-bold" href="#">
        Github Basics
      </a>
      <hr className="my-2" />
      <a className="mx-3 font-weight-bold" href="#">
        Stack Overflow
      </a>
      <hr className="my-2" />
      <a className="mx-3 font-weight-bold" href="#">
        Help & Support
      </a>
      <hr className="my-2" />
    </div>
  )
}

export default AdditionalResources
