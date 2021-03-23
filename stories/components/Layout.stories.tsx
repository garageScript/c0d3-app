import React from 'react'
import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import Layout from '../../components/Layout'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'

const customViewports = {
  LaptopHiDPI: {
    name: 'Laptop HiDPI',
    styles: {
      width: '1440px',
      height: '900px'
    }
  },
  HD4K: {
    name: 'HD 4K',
    styles: {
      width: '2560px',
      height: '732px'
    }
  }
}

addParameters({
  viewport: {
    viewports: { ...customViewports, ...INITIAL_VIEWPORTS }
  }
})

export default {
  component: Layout,
  title: 'Components/Layout'
}

const FakeChild = () => (
  <div className="row" style={{ height: '100vh' }}>
    <div className="card col-6">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  </div>
)

export const LoggedIn: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: [],
          session: {
            user: {
              id: 1,
              username: 'fakeusername',
              name: 'fake user'
            },
            submissions: [],
            lessonStatus: []
          },
          alerts: []
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Layout>
        <FakeChild />
      </Layout>
    </MockedProvider>
  )
}

export const LoggedOut: React.FC = () => {
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

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Layout>
        <FakeChild />
      </Layout>
    </MockedProvider>
  )
}

export const NoLayout: React.FC = () => {
  return <FakeChild />
}
