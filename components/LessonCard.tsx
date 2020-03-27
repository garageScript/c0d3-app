import React from 'react'
import { CheckCircle } from 'react-feather'
import '../scss/lessonCard.scss'

type Props = {
  coverImg: string
  title: string
  challengeCount: number
  description: string
  currentState?: string
  reviewUrl: string
}

const LessonCard: React.FC<Props> = props => {
  const containerClass =
    props.currentState === 'inProgress'
      ? 'lesson-card__container_inprogress border-primary'
      : ''
  return (
    <div className={`card shadow-sm mt-3 border-0 ${containerClass}`}>
      <div className="card-body p-2">
        <div className="row no-gutters">
          {props.currentState === 'completed' && (
            <span className="badge badge-pill badge-success position-absolute lesson-card__container_completed">
              <CheckCircle style={{ height: '15px', marginTop: '-2px' }} />
              <span className="mr-1">COMPLETED</span>
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
                  src="/curriculumAssets/icons/icon-challenge.svg"
                  alt="icon-challenge"
                />
                <span className="lesson-card__icon-text">
                  {props.challengeCount} CHALLENGES
                </span>
              </div>
            </div>
            <p className="lesson-card__description mt-2">{props.description}</p>
          </div>
          {props.currentState === 'completed' && (
            <span className="position-absolute lesson-card__container_review">
              <a
                href={props.reviewUrl}
                className="btn btn-sm bg-primary text-white"
              >
                Review Submissions
              </a>
            </span>
          )}
        </div>
      </div>
      {props.currentState === 'inProgress' && (
        <div className="card-footer bg-primary">
          <a
            className="lesson-card__button btn btn-light mr-2 my-1 text-primary"
            href="#"
          >
            Start Lesson
          </a>
          <a
            className="lesson-card__button btn bg-primary my-1 text-white border border-white"
            href="#"
          >
            View Challenges
          </a>
        </div>
      )}
    </div>
  )
}

export default LessonCard
