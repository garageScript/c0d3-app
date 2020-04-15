import React from 'react'
import NavLink from './NavLink'
import '../scss/additionalResources.scss'

const AdditionalResources: React.FC = () => {
  return (
    <div className="additional-resources__container mt-4 mb-0">
      <h1 className="additional-resources__title text-muted">
        ADDITIONAL RESOURCES
      </h1>
      <hr className="my-2" />
      <NavLink
        text="Setup Instructions"
        path="https://www.notion.so/Setup-Instructions-fc8f8fcc1376482ead839fa6b1034cb4"
        className="mx-3"
        blank
      />
      <hr className="my-2" />
      <NavLink text="Github Basics" path="#" className="mx-3" />
      <hr className="my-2" />
      <NavLink
        text="Stack Overflow"
        path="https://stackoverflow.com/"
        className="mx-3"
        blank
      />
      <hr className="my-2" />
      <NavLink
        text="Help &amp; Support"
        path="https://chat.c0d3.com/"
        className="mx-3"
        blank
      />
      <hr className="my-2" />
    </div>
  )
}

export default AdditionalResources
