import * as React from 'react'
import LessonTitleCard from '../../components/LessonTitleCard'

export default {
  component: LessonTitleCard,
  title: 'Components/LessonTitleCard'
}

export const Basic: React.FC = () => (
  <LessonTitleCard
    lessonCoverUrl="js-0-cover.svg"
    lessonUrl="#"
    lessonTitle="Foundations"
    isPassed={false}
    lessonId="5"
  />
)

export const PassedLesson: React.FC = () => (
  <LessonTitleCard
    lessonCoverUrl="js-0-cover.svg"
    lessonUrl="#"
    lessonTitle="Foundations"
    isPassed={true}
    lessonId="5"
  />
)
