import React, { useContext, useEffect } from 'react'
import { SubmissionComments } from './SubmissionComments'
import { fireEvent, waitFor, render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_PREVIOUS_SUBMISSIONS from '../graphql/queries/getPreviousSubmissions'
import { InMemoryCache } from '@apollo/client'
import submissionData from '../__dummy__/submission'
import DELETE_COMMENT from '../graphql/queries/deleteComment'
import EDIT_COMMENT from '../graphql/queries/editComment'
import dummySessionData from '../__dummy__/sessionData'
import { GlobalContext } from '../helpers/globalContext'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

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
  },
  {
    request: {
      query: EDIT_COMMENT,
      variables: { id: 1, content: 'edited test comment' }
    },
    result: { data: { id: 1, content: 'edited test comment' } },
    newData: jest.fn(() => ({
      data: {
        editComment: {
          id: '1',
          content: 'edited test comment'
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
  },
  {
    id: 2,
    content: 'test comment 2',
    submissionId: 101,
    createdAt: '224',
    authorId: 1,
    line: 2,
    fileName: 'js7/1.js',
    author: {
      username: 'admin'
    }
  }
]

describe('Test SubmissionComments Component', () => {
  const fillOutCommentInput = async (getByTestId, str) => {
    const textField = getByTestId('textbox')

    // the type event needs to be delayed so the Formik validations finish
    await userEvent.type(textField, str, { delay: 1 })
  }

  const Wrapper = ({ userId = 1, children }) => {
    const context = useContext(GlobalContext)
    const incorrectUserData = {
      id: userId,
      name: 'fake user',
      email: 'fake@fakemail.com',
      isAdmin: true
    }
    useEffect(() => {
      context.setContext({ ...dummySessionData, user: incorrectUserData })
    }, [])
    return <>{children}</>
  }
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

  it('should allow user to edit comment and discard changes when edit button is pressed, but not edit more than 1 comment in a chain', async () => {
    const cache = new InMemoryCache({ addTypename: false })

    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 3, challengeId: 6 },
      data: { getPreviousSubmissions: submissionsData }
    })
    expect.assertions(4)
    const { container, findByText } = render(
      <MockedProvider cache={cache} addTypename={false} mocks={mocks}>
        <Wrapper>
          <SubmissionComments comments={comments} submission={submissionData} />
        </Wrapper>
      </MockedProvider>
    )

    const editButton = container.querySelector('.btn-outline-info.btn-sm')
    fireEvent.click(editButton)
    const discardButton = container.querySelector('.btn-light')

    await waitFor(() => {
      expect(discardButton).toBeInTheDocument()
      expect(container.querySelector('.btn-info')).toBeInTheDocument()

      const editButtonTwo = container.querySelector('.btn-outline-info.btn-sm')
      fireEvent.click(editButtonTwo)
    })

    const warningText =
      'You can only edit one comment in a single comment chain at a time.'
    expect(await findByText(warningText)).toBeTruthy()

    fireEvent.click(discardButton)
    expect(editButton).toBeInTheDocument()
  })

  it('should update comment when save changes button is clicked', async () => {
    const cache = new InMemoryCache({ addTypename: false })

    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 3, challengeId: 6 },
      data: { getPreviousSubmissions: submissionsData }
    })
    const { container, getByTestId } = render(
      <MockedProvider cache={cache} addTypename={false} mocks={mocks}>
        <Wrapper>
          <SubmissionComments
            comments={comments.slice(0, 1)}
            submission={submissionData}
          />
        </Wrapper>
      </MockedProvider>
    )

    await userEvent.click(container.querySelector('.btn-outline-info.btn-sm'))

    await userEvent.clear(getByTestId('textbox'))
    await fillOutCommentInput(getByTestId, 'edited test comment') // previous text: test comment

    const saveButton = container.querySelector('.btn-info')
    await userEvent.click(saveButton)

    const editCommentMutation = mocks[2].newData

    expect(editCommentMutation).toHaveBeenCalled()

    expect(container.querySelector('.btn-outline-danger')).toBeInTheDocument()
    expect(
      container.querySelector('.btn-outline-info.btn-sm')
    ).toBeInTheDocument()
  })

  it('should close Modal when you click Close button', async () => {
    const cache = new InMemoryCache({ addTypename: false })

    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { userId: 3, challengeId: 6 },
      data: { getPreviousSubmissions: submissionsData }
    })

    const { container } = render(
      <MockedProvider cache={cache} addTypename={false} mocks={mocks}>
        <Wrapper>
          <SubmissionComments comments={comments} submission={submissionData} />
        </Wrapper>
      </MockedProvider>
    )

    await userEvent.click(container.querySelector('.btn-outline-info.btn-sm'))
    await userEvent.click(container.querySelector('.btn-outline-info.btn-sm'))

    await waitFor(() => fireEvent.click(screen.getByText(/Close/)))
    await waitFor(() => expect(screen.queryByText('Error')).toBeFalsy())
  })
})
