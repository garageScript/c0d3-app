import React from 'react'

import '../scss/lessonCard.scss'

type Props = {
  coverImg: string
  title: string
  challengeCount: number
  lessonCount: number
  hourCount: string | number
  description: string
}

const LessonCard: React.FC<Props> = props => {
  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body p-2">
        <div className="row no-gutters">
          <div className="col-2 mr-4">
            <img
              className="card-img h-100"
              src={`/curriculumAssets/lessonCoversSvg/${props.coverImg}`}
              alt={props.coverImg}
            />
          </div>
          <div className="lesson-details col-9">
            <h4 className="card-title font-weight-bold mt-3">{props.title}</h4>
            <div className="icon-messages flex-wrap">
              <div className="mr-3">
                <img
                  className="mr-1"
                  src="/curriculumAssets/icons/icon-lesson.svg"
                  alt="icon-lessons"
                />
                <span className="icon-text">{props.lessonCount} LESSONS</span>
              </div>
              <div className="mr-3">
                <img
                  className="mr-1"
                  src="/curriculumAssets/icons/icon-challenge.svg"
                  alt="icon-challenge"
                />
                <span className="icon-text">
                  {props.challengeCount} CHALLENGES
                </span>
              </div>
              <div className="mr-3">
                <img
                  className="mr-1"
                  src="/curriculumAssets/icons/icon-time.svg"
                  alt="icon-time"
                />
                <span className="icon-text">{props.hourCount} HOURS</span>
              </div>
            </div>
            <p className="lesson-description">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
