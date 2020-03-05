import React from 'react'

import '../scss/lessonCard.scss'

type Props = {
  coverImg: string
  title: string
  challengeCount: number
  lessonCount: number
  hourCount: string | number
  description: string
  currentState?: string
}

const LessonCard: React.FC<Props> = props => {
  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body p-2">
        <div className="row no-gutters">
          {props.currentState === 'completed' && (
            <span className="badge badge-pill text-white position-absolute lesson-card__container_completed">
              <img
                className="lesson-card__completed-icon mr-1"
                width="24"
                height="24"
                src="/curriculumAssets/icons/check-circle.svg"
                alt="icon-complete"
              />
              <span>COMPLETED</span>
            </span>
          )}
          <div className="mw-100 col-2 mr-4">
            <img
              src={`/curriculumAssets/lessonCoversSvg/${props.coverImg}`}
              alt={props.coverImg}
            />
          </div>
          <div className="col-9">
            <h4 className="lesson-card__title font-weight-bold mt-3">
              {props.title}
            </h4>
            <div>
              <div className="d-inline-block mr-4">
                <img
                  className="mr-1"
                  src="/curriculumAssets/icons/icon-lesson.svg"
                  alt="icon-lessons"
                />
                <span className="lesson-card__icon-text">
                  {props.lessonCount} LESSONS
                </span>
              </div>
              <div className="d-inline-block mr-4">
                <img
                  className="mr-1"
                  src="/curriculumAssets/icons/icon-challenge.svg"
                  alt="icon-challenge"
                />
                <span className="lesson-card__icon-text">
                  {props.challengeCount} CHALLENGES
                </span>
              </div>
              <div className="d-inline-block mr-4">
                <img
                  className="mr-1"
                  src="/curriculumAssets/icons/icon-time.svg"
                  alt="icon-time"
                />
                <span className="lesson-card__icon-text">
                  {props.hourCount} HOURS
                </span>
              </div>
            </div>
            <p className="lesson-card__description mt-2">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
