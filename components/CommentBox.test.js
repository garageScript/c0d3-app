import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddComment from '../graphql/queries/addComment'
import '@testing-library/jest-dom'
import CommentBox from './CommentBox'
import { MockedProvider } from '@apollo/client/testing'
import { InMemoryCache } from '@apollo/client'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import GET_APP from '../graphql/queries/getApp'
import dummySessionData from '../__dummy__/sessionData'
import dummyLessonData from '../__dummy__/lessonData'
import dummyAlertData from '../__dummy__/alertData'
import { SubmissionStatus } from '../graphql'
import { ContextProvider } from '../helpers/globalContext'

//jest.spyOn(React, 'useContext').mockImplementation(() => ({
//session: {
//user: {
//username: 'user',
//name: 'User User'
//}
//}
//}))

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
  const submission = {
    id: 0,
    status: SubmissionStatus.Open,
    mrUrl: '',
    diff: 'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n',
    viewCount: 0,
    comment: 'Some comment',
    order: 0,
    challengeId: 146,
    lessonId: 2,
    user: {
      username: 'fake user',
      name: 'fake student',
      email: 'fake@fakemail.com',
      id: 1,
      isAdmin: false
    },
    challenge: {
      id: 23,
      title: 'fake challenge',
      description: 'fake description',
      lessonId: 2,
      order: 1
    },
    reviewer: {
      id: 1,
      username: 'fake reviewer',
      name: 'fake reviewer',
      email: 'fake@fakemail.com',
      isAdmin: false
    },
    createdAt: '123',
    updatedAt: '123',
    comments: []
  }
  const submissionsData = [submission, { ...submission, id: 1 }]

  test('Should add comment by reviewer', async () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_SUBMISSIONS,
      variables: { lessonId: 1 },
      data: { submissions: submissionsData }
    })
    render(
      <ContextProvider>
        <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
          <CommentBox
            line={4}
            fileName="test.js"
            submissionId={0}
            authorId={0}
            name="user"
            username="User User"
            commentsData={comments}
            lessonId={1}
          />
        </MockedProvider>
      </ContextProvider>
    )
    userEvent.type(screen.getByTestId('textbox'), 'A very unique test comment!')
    userEvent.click(screen.getByText('Add comment'))
    await waitFor(() =>
      expect(
        screen.getAllByText('A very unique test comment!')[0]
      ).toBeVisible()
    )
  })
  test('Should add comment by student', async () => {
    const cache = new InMemoryCache({ addTypename: false })
    cache.writeQuery({
      query: GET_APP,
      data: {
        lessons: dummyLessonData,
        alerts: dummyAlertData,
        session: {
          ...dummySessionData,
          submissions: submissionsData
        }
      }
    })
    render(
      <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
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
    userEvent.type(screen.getByTestId('textbox'), 'A very unique test comment!')
    userEvent.click(screen.getByText('Add comment'))
    await waitFor(() =>
      expect(
        screen.getAllByText('A very unique test comment!')[0]
      ).toBeVisible()
    )
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
          lessonId={2}
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
