import * as React from 'react'
import LessonTitleCard from '../../components/LessonTitleCard'
import dummyLessonsData from '../../__dummy__/lessonData'

export default {
  component: LessonTitleCard,
  title: 'Components/LessonTitleCard'
}

export const Basic: React.FC = () => (
  <LessonTitleCard metaData={dummyLessonsData[0]} isPassed={false} />
)

export const PassedLesson: React.FC = () => (
  <LessonTitleCard metaData={dummyLessonsData[0]} isPassed={true} />
)
