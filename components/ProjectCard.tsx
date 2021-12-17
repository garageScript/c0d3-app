import React from 'react'
import NavLink from './NavLink'
import Image from 'next/image'
import styles from '../scss/lessonCard.module.scss'

type Props = {
  title: string
  description: string
  members: object[]
}

const ProjectCard: React.FC<Props> = props => {
  return (
    <div className={`card shadow-sm mt-3 border-0`}>
      <div className="d-none d-sm-flex p-2">
        <Image
          src={`/assets/curriculum/js-0-cover.svg`}
          className="align-self-center"
          width="116"
          height="165"
          objectFit="contain"
        />

        <div
          className={`${styles['lesson-card__description']} pl-4 d-none d-sm-block`}
        >
          <div className="d-flex">
            <h4
              className={`${styles['lesson-card__title']} font-weight-bold mt-3`}
            >
              <NavLink path="fake-path">{props.title}</NavLink>
            </h4>
          </div>

          <div>
            <div>
              <div className="d-inline-block mr-4">
                <img
                  className="mr-2"
                  src="/assets/curriculum/icons/icon-challenge.svg"
                  alt="icon-challenge"
                />
                <span className={`${styles['lesson-card__icon-text']}`}>
                  {props.members.length} MEMBERS
                </span>
              </div>
            </div>
            <p className="mt-2">{props.description}</p>
          </div>
        </div>
      </div>

      <div className="p-2 bg-primary">
        <NavLink
          path="fake-path"
          className={`${styles['lesson-card__button']} btn btn-light mr-2 my-1 text-primary`}
          external
        >
          Start Project
        </NavLink>
        <NavLink
          path="fake-path"
          className={`${styles['lesson-card__button']} btn bg-primary my-1 text-white border border-white`}
        >
          View Project
        </NavLink>
      </div>
    </div>
  )
}

export default ProjectCard
