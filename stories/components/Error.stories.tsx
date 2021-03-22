import * as React from 'react'
import Error, { StatusCode } from '../../components/Error'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import * as nextImage from 'next/image'
import { ImageProps } from '../../node_modules/next/dist/client/image'
import { withTestRouter } from '../../__tests__/utils/withNextRouter'
//storybook doesn't support nextImage yet
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props: ImageProps) => {
    return <img {...props} className="img-fluid" />
  }
})
export default {
  components: Error,
  title: 'Components/Error'
}
const mocks = [
  {
    request: { query: GET_APP },
    result: {
      data: {
        lessons: [],
        session: null,
        alerts: []
      }
    }
  }
]
export const NotFound: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Error code={StatusCode.NOT_FOUND} message="404 error" />
    </MockedProvider>
  )
}

export const Internal: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="No data" />
    </MockedProvider>
  )
}
