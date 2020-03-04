import * as React from 'react'
import LessonCard from '../../components/LessonCard'

export default {
  component: LessonCard,
  title: 'Components/LessonCard'
}

export const Basic: React.FC = () => (
  <LessonCard
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    lessonCount={10}
    hourCount="-"
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
  />
)

export const withInProgress: React.FC = () => (
  <LessonCard
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    lessonCount={10}
    hourCount="-"
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    inProgress
  />
)
