import React from 'react'
import LessonLayout, { getLayout } from '../../components/LessonLayout'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import GET_SESSION from '../../graphql/queries/getSession'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'
import { Lesson } from '../../graphql'

export default {
  component: LessonLayout,
  title: 'Components/LessonLayout'
}
const mocks = [
  {
    request: { query: GET_SESSION },
    result: {
      data: {
        session: dummySessionData
      }
    }
  },
  {
    request: { query: GET_APP },
    result: {
      data: {
        lessons: [],
        session: dummySessionData,
        alerts: []
      }
    }
  }
]
export const JustLessonLayout: React.FC = () => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <LessonLayout lesson={dummyLessonData[0]}></LessonLayout>
    </MockedProvider>
  )
}
export const WithText: React.FC = () => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <LessonLayout lesson={dummyLessonData[0]}>
        <p>
          Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
          commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam
          atque a dolores quisquam quisquam adipisci possimus laboriosam.
          Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos
          quod. Ab quos consequuntur eaque quo rem! Mollitia reiciendis porro
          quo magni incidunt dolore amet atque facilis ipsum deleniti rem!
        </p>
      </LessonLayout>
    </MockedProvider>
  )
}
export const GetLayout: React.FC = () => {
  const pageProps = { lesson: dummyLessonData[0] }
  const Page: React.FC<{ lesson: Lesson }> = () => <>Page</>
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      {getLayout(<Page {...pageProps} />, pageProps)}
    </MockedProvider>,
    {
      query: { lessonSlug: '2' }
    }
  )
}
