import React from 'react'
import _ from 'lodash'
import '../scss/lessonsChallenges.scss'

const LessonsChallenges: React.FC = props => {
  console.log('PROPS:', props.lessons)
  const displayLessons = props.lessons.map(lesson => {
    return (
      <div className="lessonimage_container" style={{ display: 'flex' }}>
        <img
          src={`/curriculumAssets/lessonCoversSvg/js-${lesson.order}-cover.svg`}
        />
        <div className="titles_container">
          <h6 style={{ marginLeft: '50px', marginTop: '15px', color: 'grey' }}>
            {lesson.title}
          </h6>
          <h6 style={{ marginLeft: '50px', marginTop: '15px' }}>
            {'15 of 15 Challenges completed'}
          </h6>
        </div>
      </div>
    )
  })
  return (
    <div className="card">
      <h3>Challenges</h3>
      <div>{displayLessons}</div>
    </div>
  )
}

export default LessonsChallenges
