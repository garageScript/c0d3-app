import React from 'react'
import NavLink from './NavLink'
import '../scss/lessonTitleCard.scss'

type Props = {
  lessonCoverUrl: string
  lessonUrl: string
  lessonTitle: string
  lessonId?: string
  isPassed: boolean
}

const LessonTitleCard: React.FC<Props> = props => {
  return (
    <div className="card shadow-sm mt-3 col-12 px-0 pt-3 border-0">
      <div className="card-body p-0">
        <div className="d-flex mb-3 px-3">
          <img
            className="lessonTitleCard__lesson-cover mr-3"
            src={`/curriculumAssets/lessonCoversSvg/${props.lessonCoverUrl}`}
            alt="lesson-cover"
          />
          <div>
            <p className="m-0">
              <NavLink path="/curriculum">Go Back</NavLink>
            </p>
            <h1 className="lessonTitleCard__lesson-title">
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
          <NavLink
            path={`/curriculum/${props.lessonId}`}
            className="btn border-right rounded-0 px-4 py-3"
          >
            CHALLENGES
          </NavLink>
          {props.isPassed && (
            <NavLink
              path={`/review/${props.lessonId}`}
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
