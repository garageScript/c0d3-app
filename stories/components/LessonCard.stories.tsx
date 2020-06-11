import * as React from 'react'
import LessonCard from '../../components/LessonCard'

export default {
  component: LessonCard,
  title: 'Components/LessonCard'
}

export const Dummy: React.FC = () => <div>Dummy Lesson Card</div>

/*
  TODO Storybook should focus on UI only.
  LessonCard/ReviewCount uses query that relies on client Context from the Apollo Provider.
  Refer to issue #275: https://github.com/garageScript/c0d3-app/issues/275

export const Basic: React.FC = () => (
  <LessonCard
    lessonId={4}
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    reviewUrl="https://c0d3.com/teacher/5"
    challengesUrl="https://c0d3.com/student/24"
    docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
  />
)

export const withInProgress: React.FC = () => (
  <LessonCard
    lessonId={4}
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    currentState="inProgress"
    reviewUrl="https://c0d3.com/teacher/5"
    challengesUrl="https://c0d3.com/student/24"
    docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
  />
)

export const withCompleted: React.FC = () => (
  <LessonCard
    lessonId={4}
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    currentState="completed"
    reviewUrl="https://c0d3.com/teacher/5"
    challengesUrl="https://c0d3.com/student/24"
    docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
  />
)
*/
