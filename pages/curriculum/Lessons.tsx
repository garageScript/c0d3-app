// import libraries
import React from 'react'

// import components
import LessonCard from '../../components/LessonCard'

// import types
import { Lesson } from '../../@types/lesson'

type LessonsProps = {
  lessonData: any
}

const Lessons: React.FC<LessonsProps> = ({ lessonData }) => {
  if (!lessonData) {
    return (
      <>
        <h1>No lessons at this time...</h1>
      </>
    )
  }
  const { curriculumStatus }: { curriculumStatus: Lesson[] } = lessonData
  const sortedLessons: Lesson[] = curriculumStatus.sort(
    (a, b) => a.order - b.order
  )
  const lessonInProgressIdx = sortedLessons.findIndex(
    lesson => !lesson.currentUser.userLesson.isPassed
  )
  const lessonsCards = sortedLessons.map((lesson, idx) => {
    let lessonState = ''
    if (
      lesson.currentUser.userLesson.isEnrolled ||
      idx === lessonInProgressIdx
    ) {
      lessonState = 'inProgress'
    }
    if (lesson.currentUser.userLesson.isPassed) {
      lessonState = 'completed'
    }
    return (
      <LessonCard
        key={lesson.id}
        lessonId={lesson.id}
        coverImg={`js-${idx}-cover.svg`}
        title={lesson.title}
        challengeCount={lesson.challenges.length}
        description={lesson.description}
        currentState={lessonState}
        reviewUrl={`https://c0d3.com/teacher/${lesson.id}`}
        challengesUrl={`https://c0d3.com/student/${lesson.id}`}
        docUrl={lesson.docUrl}
      />
    )
  })
  return <>{lessonsCards}</>
}

export default Lessons
