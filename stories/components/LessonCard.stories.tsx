import * as React from 'react'
import LessonCard from '../../components/LessonCard'

export default {
  component: LessonCard,
  title: 'Components/LessonCard'
}

const numberOfChallenges = 10
const numberOfLessons = 10
const numberOfHours = 10

export const Basic: React.FC = () => (
  <LessonCard
    coverImg="Name of Image File"
    title="Title of Lesson"
    challengeCount={numberOfChallenges}
    lessonCount={numberOfLessons}
    hourCount={numberOfHours}
    description="Lesson Description"
  ></LessonCard>
)
