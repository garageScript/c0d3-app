import React from 'react'
import NavLink from './NavLink'
import styles from '../scss/lessonTitleCard.module.scss'
import { useRouter } from 'next/router'
import useBreakpoint from '../helpers/useBreakpoint'

export type LessonTitleProps = {
  lessonCoverUrl: string
  lessonUrl?: string | null
  lessonSlug: string
  lessonTitle: string
  lessonId: number
  isPassed: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  show?: boolean
}

const LessonTitleCard: React.FC<LessonTitleProps> = ({
  lessonCoverUrl,
  lessonUrl,
  lessonSlug,
  lessonTitle,
  isPassed,
  setShow,
  show
}) => {
  const isSmallDownBreakpoint = useBreakpoint('sm', 'down')
  const router = useRouter()

  return (
    <div className="card shadow-sm mt-3 col-12 px-0 pt-3 border-0">
      <div className="card-body p-0">
        <div className="d-flex mb-3 px-3">
          <img
            className={`${styles['lessonTitleCard__lesson-cover']} mr-3`}
            src={`/assets/curriculum/${lessonCoverUrl}`}
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
              {lessonTitle}
            </h1>
          </div>
        </div>
        <div className="card-footer bg-white p-0">
          {lessonUrl && (
            <NavLink
              path={lessonUrl}
              className="btn border-end rounded-0 px-4 py-3"
            >
              LESSON
            </NavLink>
          )}
          {isSmallDownBreakpoint && setShow ? (
            <div
              onClick={() => setShow!(!show)}
              className="btn border-end rounded-0 px-4 py-3"
            >
              SHOW CHALLENGES
            </div>
          ) : (
            <NavLink
              path={`/curriculum/${lessonSlug}`}
              className="btn border-end rounded-0 px-4 py-3"
            >
              CHALLENGES
            </NavLink>
          )}
          {isPassed && (
            <NavLink
              path={`/review/${lessonSlug}`}
              className="btn border-end rounded-0 px-4 py-3"
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
