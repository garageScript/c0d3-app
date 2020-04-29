import React from 'react'
import _ from 'lodash'
import '../scss/profileLessons.scss'

type LessonImageProps = {
  order: number
  progress?: number
}

type ProfileLessonsProps = {
  lessons: LessonImageProps[]
}

const LessonImage: React.FC<LessonImageProps> = ({ progress = 0, order }) => {
  const lessonProgress = progress + '%'
  const color = lessonProgress === '100%' ? 'success' : 'primary'
  const lessonImageClass =
    lessonProgress === '0%'
      ? 'lessonimage_opacity_container'
      : 'lessonimage_container'
  const progressContainer = (
    <p className={`lessonimage_progressbadge badge badge-pill badge-${color}`}>
      {lessonProgress}
    </p>
  )
  const badge = lessonProgress !== '0%' ? progressContainer : <></>

  return (
    <div className={lessonImageClass}>
      {badge}
      <img src={`/curriculumAssets/lessonCoversSvg/js-${order}-cover.svg`} />
    </div>
  )
}

const ProfileLessons: React.FC<ProfileLessonsProps> = ({ lessons }) => {
  const displayLessons = lessons.map(lesson => {
    const keyId = _.uniqueId()
    return (
      <LessonImage
        key={keyId}
        order={lesson.order}
        progress={lesson.progress}
      />
    )
  })

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="profilelessons_title">Lessons</h3>
        {displayLessons}
      </div>
    </div>
  )
}

export default ProfileLessons
