import React from 'react'
import ProfileStarComments from '../../components/ProfileStarComments'
import { Star as StarType } from '../../graphql/index'

export default {
  component: ProfileStarComments,
  title: 'Components/ProfileStarComments'
}

const stars: StarType[] = [
  {
    id: 1,
    student: {
      id: 1,
      name: 'Alexandra',
      username: 'ale',
      email: 'ale@fakemail.com',
      isAdmin: false
    },
    lessonId: 23,
    lesson: {
      id: 4,
      title: 'Objects',
      order: 3
    },
    comment:
      "Thanks. I was once lost but now I'm found. Was blind but now I see."
  },
  {
    id: 2,
    student: {
      id: 2,
      name: 'Charles',
      username: 'cko',
      email: 'cko@fakemail.com',
      isAdmin: false
    },
    lessonId: 33,
    lesson: {
      id: 3,
      title: 'End to End',
      order: 5
    },
    comment: "Objects ain't easy, but thanks to you, they're now lemon squeezy."
  }
]

export const _ProfileStarComments: React.FC = () => (
  <ProfileStarComments stars={stars} />
)
