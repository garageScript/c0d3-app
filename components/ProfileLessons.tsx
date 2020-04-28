import React from 'react'
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
  const opacity = lessonProgress === '0%' ? 0.5 : 1

  return (
    <div className="lessonimage_container" style={{ opacity: opacity }}>
      {progress && (
        <p
          className={`lessonimage_progressbadge badge badge-pill badge-${color}`}
        >
          {lessonProgress}
        </p>
      )}
      <img src={`/curriculumAssets/lessonCoversSvg/js-${order}-cover.svg`} />
    </div>
  )
}

const ProfileLessons: React.FC<ProfileLessonsProps> = ({ lessons }) => {
  const displayLessons = lessons.map((lesson, i) => {
    return (
      <LessonImage key={i} order={lesson.order} progress={lesson.progress} />
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
