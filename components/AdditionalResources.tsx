import React from 'react'
import NavLink from './NavLink'

const AdditionalResources: React.FC = () => {
  return (
    <div className="additional-resources__container mt-4 mb-0">
      <h1 className="additional-resources__title text-muted">
        ADDITIONAL RESOURCES
      </h1>
      <hr className="my-2" />
      <NavLink
        path="https://www.notion.so/Setup-Instructions-fc8f8fcc1376482ead839fa6b1034cb4"
        className="mx-3"
        external
      >
        Setup Instructions
      </NavLink>
      <hr className="my-2" />
      <NavLink path="#" className="mx-3">
        Github Basics
      </NavLink>
      <hr className="my-2" />
      <NavLink path="https://stackoverflow.com/" className="mx-3" external>
        Stack Overflow
      </NavLink>
      <hr className="my-2" />
      <NavLink path="https://chat.c0d3.com/" className="mx-3" external>
        Help &amp; Support
      </NavLink>
      <hr className="my-2" />
    </div>
  )
}

export default AdditionalResources
