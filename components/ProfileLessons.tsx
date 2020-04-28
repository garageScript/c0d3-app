import React from 'react'

type Lesson = {
  order: number
  progress?: number
}

type LessonsProp = {
  lessons: Lesson[]
}

type lesson = {
  order: number
  progress: string
}

const LessonImage: React.FC<lesson> = ({ progress, order }) => {
  let color = 'primary'
  if (progress === '100%') {
    color = 'success'
  }

  let opacity = 1
  let badge = (
    <p
      style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        border: 'solid white 2px'
      }}
      className={`badge badge-pill badge-${color}`}
    >
      {progress}
    </p>
  )

  if (progress === '0%') {
    badge = <></>
    opacity = 0.5
  }

  return (
    <div
      style={{
        position: 'relative',
        padding: '8px',
        opacity: opacity,
        display: 'inline-block'
      }}
    >
      {badge}
      <img src={`/curriculumAssets/lessonCoversSvg/js-${order}-cover.svg`} />
    </div>
  )
}

const ProfileLessons: React.FC<LessonsProp> = ({ lessons }) => {
  const displayLessons = lessons.map((lesson, i) => {
    if (!lesson.progress) {
      lesson.progress = 0
    }
    return (
      <LessonImage
        key={i}
        order={lesson.order}
        progress={lesson.progress + '%'}
      ></LessonImage>
    )
  })

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 style={{ padding: '8px' }}>Lessons</h3>
        {displayLessons}
      </div>
    </div>
  )
}

export default ProfileLessons
