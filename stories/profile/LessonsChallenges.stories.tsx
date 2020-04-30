import * as React from 'react'
import LessonsChallenges from '../../components/LessonsChallenges'

export default {
  component: LessonsChallenges,
  title: 'Components/LessonChallenges'
}

const lessons = [
  { order: 0, title: 'Foundation of Javascript' },
  { order: 1, title: 'Variables & Functions' },
  { order: 2, title: 'Arrays' },
  { order: 3, title: 'Objects' },
  { order: 4, title: 'Front End Engineering' },
  { order: 5, title: 'End to End' },
  { order: 6, title: 'React, GraphQL, SocketIO' },
  { order: 7, title: 'Javscript Algorithms' },
  { order: 8, title: 'Trees' },
  { order: 9, title: 'General Algorithms' }
]

export const _LessonsChallenges: React.FC = () => (
  <LessonsChallenges lessons={lessons} />
)
