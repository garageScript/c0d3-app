import React from 'react'

type Lesson = {
  order: number
  progress?: number
}

type LessonsProp = {
  lessons: Lesson[]
}


const LessonImage: React.FC<Lesson> = ({ progress=0, order }) => {
  const lessonProgress = progress + '%' 
  const color = lessonProgress === '100%'? 'success' : 'primary'
  const opacity = lessonProgress === '0%' ? 0.5 : 1
 
  return (
    <div style={{ position: 'relative', padding: '8px', opacity: opacity, display: 'inline-block' }}>
      
  {progress && (
    <p
      style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        border: 'solid white 2px',
        opacity: opacity 
      }}
      className={`badge badge-pill badge-${color}`}
    >
      {lessonProgress}
    </p>
  )}
      <img
        src={`/curriculumAssets/lessonCoversSvg/js-${order}-cover.svg`}
      />
    </div>
  )
}

const ProfileLessons: React.FC<LessonsProp> = ({ lessons }) => {
  const displayLessons = lessons.map((lesson, i) => {
    return (
      <LessonImage key={i} order={lesson.order} progress={lesson.progress} /> 
    )
  })

  return (
    <div className='card shadow-sm'>
     <div className='card-body'> 
      {displayLessons}
     </div>
    </div>
  )
}

export default ProfileLessons
