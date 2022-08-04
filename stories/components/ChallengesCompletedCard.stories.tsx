import { MockedProvider } from '@apollo/client/testing'
import * as React from 'react'
import { ChallengesCompletedCard } from '../../components/ChallengeMaterial/ChallengeMaterial'
import SET_STAR from '../../graphql/queries/setStar'
import GET_LESSON_MENTORS from '../../graphql/queries/getLessonMentors'
import lessonMentorsData from '../../__dummy__/getLessonMentorsData'
export default {
  component: ChallengesCompletedCard,
  title: 'Components/ChallengesCompletedCard'
}

export const StarGivenAlready: React.FC = () => (
  <ChallengesCompletedCard
    lessonId={5}
    starGiven="flimmy"
    imageSrc="icon-challenge-complete.jpg"
    reviewUrl="https://c0d3.com/teacher/5"
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
  />
)

export const StarNotGivenYet: React.FC = () => {
  const mocks = [
    {
      request: {
        query: SET_STAR,
        variables: { mentorId: 4, lessonId: 5, comment: '1' }
      },
      result: {
        data: { setStar: { success: true } }
      }
    },
    {
      request: { query: GET_LESSON_MENTORS, variables: { lessonId: '5' } },
      result: {
        data: { getLessonMentors: lessonMentorsData }
      }
    }
  ]

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ChallengesCompletedCard
        lessonId={5}
        starGiven=""
        imageSrc="icon-challenge-complete.jpg"
        reviewUrl="https://c0d3.com/teacher/5"
        chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
      />
    </MockedProvider>
  )
}
