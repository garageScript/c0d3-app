import * as React from 'react'
import ProfileLessons from '../../components/ProfileLessons'

export default {
  component: ProfileLessons,
  title: 'Components/ProfileLessons'
}

const lessons = [
  { order: 0, progress: 23 },
  { order: 1 },
  { order: 2, progress: 60 },
  { order: 3, progress: 100 },
  { order: 4, progress: 0 },
  { order: 5 },
  { order: 6, progress: 80 },
  { order: 7 },
  { order: 8, progress: 100 },
  { order: 9, progress: 0 }
]

export const _ProfileLessons: React.FC = () => (
  <ProfileLessons lessons={lessons} />
)
