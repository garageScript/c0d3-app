import React from 'react'
import '../scss/additionalResources.scss'

const AdditionalResources: React.FC = () => {
  return (
    <div className="additional-resources__container mt-4 mb-0">
      <h1 className="additional-resources__title text-muted">
        ADDITIONAL RESOURCES
      </h1>
      <hr className="my-2" />
      <a
        rel="noopener noreferrer"
        target="_blank"
        className="mx-3 "
        href="https://www.notion.so/Setup-Instructions-fc8f8fcc1376482ead839fa6b1034cb4"
      >
        Setup Instructions
      </a>
      <hr className="my-2" />
      <a className="mx-3 " href="/">
        Github Basics
      </a>
      <hr className="my-2" />
      <a
        className="mx-3"
        href="https://stackoverflow.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stack Overflow
      </a>
      <hr className="my-2" />
      <a
        className="mx-3"
        href="https://chat.c0d3.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Help & Support
      </a>
      <hr className="my-2" />
    </div>
  )
}

export default AdditionalResources
