import React from 'react'
import NavLink from './NavLink'
import styles from '../scss/additionalResources.module.scss'

const AdditionalResources: React.FC = () => {
  return (
    <div className="additional-resources__container ms-4 d-flex flex-column justify-content-around">
      <h1 className={`${styles['additional-resources__title']} fw-bold`}>
        ADDITIONAL RESOURCES
      </h1>
      <NavLink
        path="https://developer.mozilla.org/en-US/"
        className={`${styles['additional-resources_link']} me-1`}
        external
        hoverUnderline
      >
        <h2 className={`${styles['additional-resources__subtitle']} me-0`}>
          MDN Web Docs
        </h2>
      </NavLink>
      <h3 className={`${styles['additional-resources__description']}`}>
        The encyclopedia of web development
      </h3>

      <hr className="my-2 h-auto" />
      <NavLink
        path="https://javascript.info/"
        className={`${styles['additional-resources_link']} me-1`}
        external
        hoverUnderline
      >
        <h2 className={`${styles['additional-resources__subtitle']}`}>
          The Modern JavaScript Tutorial
        </h2>
      </NavLink>
      <h3 className={`${styles['additional-resources__description']}`}>
        In-depth overview of javascript language
      </h3>

      <hr className="my-2 h-auto" />
      <NavLink
        path="https://missing.csail.mit.edu/"
        className={`${styles['additional-resources_link']} me-1`}
        external
        hoverUnderline
      >
        <h2 className={`${styles['additional-resources__subtitle']} `}>
          The Missing Semester
        </h2>
      </NavLink>
      <h3 className={`${styles['additional-resources__description']}`}>
        Introduction to shell, git, vim, tmux and etc.
      </h3>

      <hr className="my-2 h-auto" />
      <NavLink
        path="https://teachyourselfcs.com/"
        className={`${styles['additional-resources_link']} me-1`}
        external
        hoverUnderline
      >
        <h2 className={`${styles['additional-resources__subtitle']}`}>
          Teach Yourself Computer Science
        </h2>
      </NavLink>
      <h3 className={`${styles['additional-resources__description']}`}>
        Self-study guide
      </h3>
      <hr className="my-2 h-auto" />
    </div>
  )
}

export default AdditionalResources
