import React from 'react'
import LessonLayout from '../../../components/LessonLayout'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../../graphql/queries/getApp'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import { withTestRouter } from '../../../__tests__/utils/withTestRouter'

const mocks = [
  {
    request: { query: GET_APP },
    result: {
      data: {
        lessons: dummyLessonData,
        session: dummySessionData,
        alerts: []
      }
    }
  }
]

export default {
  component: LessonLayout,
  title: 'LessonLayout'
}

export const WithText: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LessonLayout metaData={dummyLessonData[0]}>
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
export const WithLesson: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LessonLayout metaData={dummyLessonData[2]}>
        <p>
          Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
          commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam
          atque a dolores quisquam quisquam adipisci possimus laboriosam.
          Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos
          quod. Ab quos consequuntur eaque quo rem! Mollitia reiciendis porro
          quo magni incidunt dolore amet atque facilis ipsum deleniti rem!
        </p>
      </LessonLayout>
    </MockedProvider>,
    {
      pathname: 'foobar/primitive_data_and_operators'
    }
  )
}
