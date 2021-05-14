import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddComment from '../graphql/queries/addComment'
import '@testing-library/jest-dom'
import CommentBox from './CommentBox'
import { MockedProvider } from '@apollo/client/testing'

describe('CommentBox component', () => {
  const comments = [
    {
      content: 'First Comment',
      createdAt: '1620762267819',
      authorId: 3,
      line: 4,
      author: {
        username: 'newbie',
        name: 'Noob Newbie'
      }
    },
    {
      content: 'Second Comment',
      createdAt: '1620762275096',
      authorId: 3,
      line: 4,
      author: {
        username: 'newbie',
        name: 'Noob Newbie'
      }
    },
    {
      content: 'Second Comment',
      createdAt: '1620762275096',
      authorId: 3,
      line: 5,
      author: {
        username: 'admin',
        name: 'Admin Admin'
      }
    }
  ]
  const mocks = [
    {
      request: {
        query: AddComment,
        variables: {
          line: 4,
          fileName: 'test.js',
          submissionId: 0,
          content: 'A very unique test comment!'
        }
      },
      result: {
        data: {
          addComment: {
            id: 5
          }
        }
      }
    }
  ]
  test('Should add comment', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CommentBox
          line={4}
          fileName="test.js"
          submissionId={0}
          authorId={0}
          name="user"
          username="User User"
          commentsData={comments}
          lessonId={2}
        />
      </MockedProvider>
    )
    userEvent.type(screen.getByTestId('textbox'), 'A very unique test comment!')
    userEvent.click(screen.getByText('Add comment'))
    expect(screen.getAllByText('A very unique test comment!')[0]).toBeVisible()
  })
  test('Should not add comment if input is empty', async () => {
    const query = jest.fn()
    const mockWithFunction = [
      {
        request: {
          query: AddComment,
          variables: {
            line: 4,
            fileName: 'test.js',
            submissionId: 0,
            authorId: 0,
            content: 'A very unique test comment!'
          }
        },
        result: query
      }
    ]
    render(
      <MockedProvider mocks={mockWithFunction} addTypename={false}>
        <CommentBox
          line={4}
          fileName="test.js"
          submissionId={0}
          authorId={0}
          name="user"
          username="User User"
          commentsData={comments}
        />
      </MockedProvider>
    )
    userEvent.click(screen.getByText('Add comment'))
    expect(query).not.toBeCalled()
  })
  test('Should render empty commentBox', async () => {
    const { container } = render(
      <MockedProvider>
        <CommentBox
          line={0}
          fileName="test.js"
          submissionId={0}
          authorId={0}
          name="user"
          username="User User"
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render commentBox with comments', async () => {
    const { container } = render(
      <MockedProvider>
        <CommentBox
          line={4}
          fileName="test.js"
          submissionId={0}
          authorId={0}
          name="user"
          username="User User"
          commentsData={comments}
        />
      </MockedProvider>
    )
    expect(screen.getByText('First Comment')).toBeVisible()
    expect(screen.getByText('Second Comment')).toBeVisible()
    expect(container).toMatchSnapshot()
  })
  test('Should hide/unhide conversation', async () => {
    render(
      <MockedProvider addTypename={false}>
        <CommentBox
          line={4}
          fileName="test.js"
          submissionId={0}
          authorId={0}
          name="user"
          username="User User"
          commentsData={comments}
        />
      </MockedProvider>
    )
    expect(screen.queryByText('Show conversation')).toBeFalsy()
    userEvent.click(screen.getByText('Hide conversation'))
    expect(await screen.findByText('Show conversation')).toBeVisible()
  })
})
