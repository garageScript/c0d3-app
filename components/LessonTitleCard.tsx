import React from 'react'
import NavLink from './NavLink'
import styles from '../scss/lessonTitleCard.module.scss'
import { useRouter } from 'next/router'
import useHasMounted from '../helpers/useHasMounted'

export type LessonTitleProps = {
  lessonCoverUrl: string
  lessonUrl: string
  lessonSlug: string
  lessonTitle: string
  lessonId: number
  isPassed: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  show?: boolean
}

const LessonTitleCard: React.FC<LessonTitleProps> = props => {
  const hasMounted = useHasMounted()
  const router = useRouter()

  return (
    <div className="card shadow-sm mt-3 col-12 px-0 pt-3 border-0">
      <div className="card-body p-0">
        <div className="d-flex mb-3 px-3">
          <img
            className={`${styles['lessonTitleCard__lesson-cover']} mr-3`}
            src={`/assets/curriculum/${props.lessonCoverUrl}`}
            alt="lesson-cover"
          />
          <div>
            <p className="m-0">
              <a
                href="#"
                onClick={e => {
                  // Link does not get correct styles without the href
                  // Prevent scroll to top before going back
                  e.preventDefault()
                  router.back()
                }}
              >
                Go Back
              </a>
            </p>
            <h1 className={`${styles['lessonTitleCard__lesson-title']}`}>
              {props.lessonTitle}
            </h1>
          </div>
        </div>
        <div className="card-footer bg-white p-0">
          <NavLink
            path={props.lessonUrl}
            className="btn border-right rounded-0 px-4 py-3"
            external
          >
            LESSON
          </NavLink>
          {/* 768 px is md bootstrap breakpoint */}
          {hasMounted && window.innerWidth <= 768 && props.setShow ? (
            <div
              onClick={() => props.setShow!(!props.show)}
              className="btn border-right rounded-0 px-4 py-3"
            >
              SHOW CHALLENGES
            </div>
          ) : (
            <NavLink
              path={`/curriculum/${props.lessonSlug}`}
              className="btn border-right rounded-0 px-4 py-3"
            >
              CHALLENGES
            </NavLink>
          )}
          {props.isPassed && (
            <NavLink
              path={`/review/${props.lessonSlug}`}
              className="btn border-right rounded-0 px-4 py-3"
            >
              REVIEW
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonTitleCard
