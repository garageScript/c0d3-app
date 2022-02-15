import React, { useContext, useEffect } from 'react'
import { SubmissionComments } from './SubmissionComments'
import { fireEvent, waitFor, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_PREVIOUS_SUBMISSIONS from '../graphql/queries/getPreviousSubmissions'
import { InMemoryCache } from '@apollo/client'
import submissionData from '../__dummy__/submission'
import DELETE_COMMENT from '../graphql/queries/deleteComment'
import dummySessionData from '../__dummy__/sessionData'
import { GlobalContext } from '../helpers/globalContext'

const submissionsData = [submissionData, { ...submissionData, id: 101 }]

const getPreviousSubmissionsMock = {
  request: {
    query: GET_PREVIOUS_SUBMISSIONS,
    variables: { challengeId: 6, userId: 3 }
  },
  result: {
    data: submissionsData
  }
}

const mocks = [
  getPreviousSubmissionsMock,
  {
    request: {
      query: DELETE_COMMENT,
      variables: { id: 1 }
    },
    result: { data: { id: 1 } },
    newData: jest.fn(() => ({
      data: {
        deleteComment: {
          id: '1'
        }
      }
    }))
  }
]

const comments = [
  {
    id: 1,
    content: 'test comment',
    submissionId: 101,
    createdAt: '124',
    authorId: 1,
    line: 1,
    fileName: 'js7/1.js',
    author: {
      username: 'admin'
    }
  }
]

describe('Test SubmissionComments Component', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <MockedProvider>
        <SubmissionComments comments={comments} submission={submissionData} />
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('Should delete comment when delete button is clicked', async () => {
    const cache = new InMemoryCache({ addTypename: false })

    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 3, challengeId: 6 },
      data: { getPreviousSubmissions: submissionsData }
    })

    const Wrapper = ({ children }) => {
      const context = useContext(GlobalContext)
      const incorrectUserData = {
        id: 1,
        name: 'fake user',
        email: 'fake@fakemail.com',
        isAdmin: true
      }
      useEffect(() => {
        context.setContext({ ...dummySessionData, user: incorrectUserData })
      }, [])
      return <>{children}</>
    }

    const { container } = render(
      <MockedProvider cache={cache} addTypename={false} mocks={mocks}>
        <Wrapper>
          <SubmissionComments comments={comments} submission={submissionData} />
        </Wrapper>
      </MockedProvider>
    )

    const deleteButton = container.querySelector('.btn-outline-danger')
    fireEvent.click(deleteButton)

    const deleteCommentMutation = mocks[1].newData

    await waitFor(() => {
      expect(deleteCommentMutation).toHaveBeenCalled()
    })
  })
})
