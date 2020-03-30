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
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    reviewUrl="https://c0d3.com/teacher/5"
    docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
  />
)

export const withInProgress: React.FC = () => (
  <LessonCard
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    currentState="inProgress"
    reviewUrl="https://c0d3.com/teacher/5"
    docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
  />
)

export const withCompleted: React.FC = () => (
  <LessonCard
    coverImg={`js-4-cover.svg`}
    title={`HTML, CSS, JavaScript`}
    challengeCount={7}
    description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
    currentState="completed"
    reviewUrl="https://c0d3.com/teacher/5"
    docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
  />
)
