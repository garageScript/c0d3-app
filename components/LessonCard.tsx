import React from 'react'

import '../scss/lessonCard.scss'

type Props = {
  coverImg: string
  title: string
  challengeCount: number
  lessonCount: number
  hourCount: number
  description: string
}

const LessonCard: React.FC<Props> = props => {
  return (
    <>
      <div className="card shadow-sm mt-5">
        <div className="card-body p-1">
          <div className="row no-gutters">
            <div className="cover-img col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 pl-1 pr-4 py-2 w-25 mx-auto">
              <img
                className="card-img"
                src={`/curriculumAssets/lessonCoversSvg/${props.coverImg}`}
                alt={props.coverImg}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 my-3">
              <h4 className="card-title font-weight-bold">{props.title}</h4>
              <div className="icon-messages mt-3">
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
              <p className="mt-3">{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LessonCard
