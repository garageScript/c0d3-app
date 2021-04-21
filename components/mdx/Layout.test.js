import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from './Layout'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import dummySessionData from '../../__dummy__/sessionData'
import '@testing-library/jest-dom'

describe('Layout component', () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: dummySessionData,
          lessons: [],
          alerts: []
        }
      }
    }
  ]
  test('Should render lesson component in lesson title is provided', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
        />
      </MockedProvider>
    )
    expect(screen.getAllByText('Test title')[0]).toBeVisible()
  })
})
