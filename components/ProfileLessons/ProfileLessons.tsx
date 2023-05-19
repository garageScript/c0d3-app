import React from 'react'
import _ from 'lodash'
import styles from './profileLessons.module.scss'

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
      ? `${styles['lessonimage_opacity_container']}`
      : `${styles['lessonimage_container']}`
  const progressContainer = (
    <p
      className={`${styles['lessonimage_progressbadge']} badge badge-pill bg-${color}`}
    >
      {lessonProgress}
    </p>
  )
  const badge = lessonProgress !== '0%' ? progressContainer : <></>

  return (
    <div className={lessonImageClass}>
      {badge}
      <img src={`/assets/curriculum/js-${order}-cover.svg`} />
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
        <h3 className={`${styles['profilelessons_title']}`}>Lessons</h3>
        {displayLessons}
      </div>
    </div>
  )
}

export default ProfileLessons
