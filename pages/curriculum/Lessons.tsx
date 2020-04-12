// import libraries
import React from 'react'

// import components
import LessonCard from '../../components/LessonCard'

// import controller
import Controller from './controller'

// import types
import { LessonsProps } from './types'

const Lessons: React.FC<LessonsProps> = ({ lessonData }) => {
  const controller = new Controller(lessonData)
  if (!lessonData) {
    return <h1>No lessons at this time...</h1>
  }
  const lessonsCards = controller.lessons().map((lesson, idx) => {
    return (
      <LessonCard
        key={lesson.id}
        lessonId={lesson.id}
        coverImg={`js-${idx}-cover.svg`}
        title={lesson.title}
        challengeCount={lesson.challenges.length}
        description={lesson.description}
        currentState={controller.getLessonState(lesson, idx)}
        reviewUrl={`https://c0d3.com/teacher/${lesson.id}`}
        challengesUrl={`https://c0d3.com/student/${lesson.id}`}
        docUrl={lesson.docUrl}
      />
    )
  })
  return <>{lessonsCards}</>
}

export default Lessons
