import React from 'react'
import ProfileStarComments from '../../components/ProfileStarComments'
import { Star as StarType } from '../../graphql/index'

export default {
  component: ProfileStarComments,
  title: 'Components/ProfileStarComments'
}

const stars: StarType[] = [
  {
    id: '1',
    mentorId: 5,
    studentId: 10,
    studentName: 'Fake User',
    studentUsername: 'rahul',
    lessonId: 23,
    lessonTitle: 'Objects',
    lessonOrder: 3,
    comment:
      "Thanks. I was once lost but now I'm found. Was blind but now I see."
  },
  {
    id: '2',
    mentorId: 5,
    studentId: 10,
    studentName: 'Charlie',
    studentUsername: 'ccc',
    lessonId: 33,
    lessonTitle: 'End to End',
    lessonOrder: 5,
    comment: "Objects ain't easy, but thanks to you, they're now lemon squeezy."
  }
]

export const _ProfileStarComments: React.FC = () => (
  <ProfileStarComments stars={stars} />
)
