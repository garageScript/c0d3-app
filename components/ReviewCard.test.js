import '../__mocks__/useIsMac.mock'
import '../__mocks__/useBreakpoint.mock'
import React, { useContext, useEffect } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import GET_PREVIOUS_SUBMISSIONS from '../graphql/queries/getPreviousSubmissions'
import ADD_COMMENT from '../graphql/queries/addComment'
import ReviewCard from './ReviewCard'
import { MockedProvider } from '@apollo/client/testing'
import { SubmissionStatus } from '../graphql'
import { ContextProvider, GlobalContext } from '../helpers/globalContext'
import dummySessionData from '../__dummy__/sessionData'
import previousSubmissionsData from '../__dummy__/getPreviousSubmissionsData'
import _ from 'lodash'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'

jest.mock('../helpers/updateCache')
import { updateCache } from '../helpers/updateCache'

jest.useFakeTimers('modern').setSystemTime(new Date('2000-11-22').getTime())

// a/js7/1.c b/js7/1.c instead of a/js7/1.js b/js7/1.js
const NonJsDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1.c\n+++ b/js7/1.c\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// a/js7/1 b/js7/1 instead of a/js7/1.js b/js7/1.js
const IncorrectDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1\n+++ b/js7/1\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// .. instead of a/js7/1.js b/js7/1.js
const InCompleteDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/.\n+++ b/.\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// a/js7/1.c instead of a/js7/1.js b/js7/1.js
const NoNewPathDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1.c\n+++ b/\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'

const submissionData = previousSubmissionsData.getPreviousSubmissions[0]

const mocks = [
  {
    request: {
      query: ACCEPT_SUBMISSION,
      variables: { submissionId: 104, lessonId: 1, comment: 'Good job!' }
    },
    result: {
      data: {
        acceptSubmission: {
          id: 1,
          comment: 'Good job!',
          status: SubmissionStatus.Passed
        }
      }
    }
  },
  {
    request: {
      query: ACCEPT_SUBMISSION,
      variables: { submissionId: 104, lessonId: 1, comment: '' }
    },
    result: {
      data: {
        acceptSubmission: {
          id: 1,
          comment: '',
          status: SubmissionStatus.Passed
        }
      }
    }
  },
  {
    request: {
      query: ADD_COMMENT,
      variables: { submissionId: 104, content: 'Good job!' }
    },
    result: {
      data: {
        addComment: {
          id: 5
        }
      }
    }
  },
  {
    request: {
      query: ADD_COMMENT,
      variables: { submissionId: 104, content: '' }
    },
    result: {
      data: {
        addComment: {
          __typename: 'Comment',
          id: 5
        }
      }
    },
    newData: jest.fn(() => ({
      data: {
        addComment: {
          __typename: 'Comment',
          id: 5
        }
      }
    }))
  },
  {
    request: {
      query: ADD_COMMENT,
      variables: {
        submissionId: 104,
        content: 'A very unique test comment!'
      }
    },
    result: {
      data: {
        addComment: {
          __typename: 'Comment',
          id: 5
        }
      }
    }
  },
  {
    request: {
      query: ADD_COMMENT,
      variables: {
        submissionId: 107,
        line: 1,
        content: 'Test line comment',
        fileName: 'foobar.js'
      }
    },
    result: {
      data: {
        addComment: {
          __typename: 'Comment',
          id: 111
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        submissionId: 104,
        comment: "This won't work",
        lessonId: 1
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: 104
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        submissionId: 104,
        comment: '',
        lessonId: 1
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: 104
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        submissionId: 104,
        comment: '',
        lessonId: 1
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: 104
        }
      }
    }
  },
  {
    request: {
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { challengeId: 9, userId: 3 }
    },
    result: {
      data: previousSubmissionsData
    }
  }
]
describe('ReviewCard Component', () => {
  test('Should be able to select previous submissions', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: NonJsDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(await screen.findByTestId('iteration 1')).toBeVisible()
    await waitFor(async () => {
      await userEvent.click(screen.getByTestId('iteration 0'))
    })
    fireEvent.change(screen.getByTestId('textbox'), {
      target: { value: 'A very unique test comment!' }
    })
    fireEvent.click(screen.getByText('Submit'))
    expect(container).toMatchSnapshot()
  })
  test('Should render submissions in other languages', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: NonJsDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should return error component if there is no username in context', async () => {
    render(
      <ContextProvider>
        <MockedProvider mocks={mocks} addTypeName={false}>
          <ReviewCard
            submissionData={{ ...submissionData, diff: NonJsDiff }}
            session={dummySessionData}
          />
        </MockedProvider>
      </ContextProvider>
    )

    expect(
      screen.getByText('Error while retrieving userinfo from context')
    ).toBeVisible()
  })
  test('Should return error component if there is no name in context', async () => {
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
    render(
      <ContextProvider>
        <MockedProvider mocks={mocks} addTypeName={false}>
          <Wrapper>
            <ReviewCard
              submissionData={{ ...submissionData, diff: NonJsDiff }}
              session={dummySessionData}
            />
          </Wrapper>
        </MockedProvider>
      </ContextProvider>
    )

    expect(
      screen.getByText('Error while retrieving userinfo from context')
    ).toBeVisible()
  })

  test('Should render incorrect diff', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: IncorrectDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render incomplete diff', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: InCompleteDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render single path submission', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: NoNewPathDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should be able to accept submission', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )

    expect(await screen.findByTestId('iteration 2')).toBeVisible()
    fireEvent.click(
      screen.getByRole('radio', {
        name: 'Accept Submit feedback and approve submission'
      })
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Submit'
      })
    )
    expect(screen.firstChild).toBe(undefined)
  })
  test('Should be able to reject submission', async () => {
    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(await screen.findByTestId('iteration 2')).toBeVisible()
    fireEvent.click(
      getByRole('radio', {
        name: 'Reject Request changes and reject submission'
      })
    )
    fireEvent.click(
      getByRole('button', {
        name: 'Submit'
      })
    )

    expect(screen.firstChild).toBe(undefined)
  })
  test('Should be able to add comment', async () => {
    const updateCacheMock = jest.fn()
    updateCache.mockImplementation(() => updateCacheMock())

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )

    fireEvent.change(getByRole('textbox', { name: '' }), {
      target: { value: 'Good job!' }
    })
    fireEvent.click(
      getByRole('radio', {
        name: 'Comment Submit general feedback without explicit approval'
      })
    )
    fireEvent.click(
      getByRole('button', {
        name: 'Submit'
      })
    )

    expect(container).toMatchSnapshot()
  })
  test('Should not be able to add comment when comment value is empty', async () => {
    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )

    fireEvent.click(
      getByRole('radio', {
        name: 'Comment Submit general feedback without explicit approval'
      })
    )
    fireEvent.click(
      getByRole('button', {
        name: 'Submit'
      })
    )
    const addDeleteMutation = mocks[3].newData

    await waitFor(() => expect(addDeleteMutation).toHaveBeenCalledTimes(0))

    expect(container).toMatchSnapshot()
  })
  test('Should render reviewer with name', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{
            ...submissionData,
            reviewer: {
              name: 'Admin admin'
            }
          }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(screen.queryByText('undefined')).toBeFalsy()
  })
  test('Should render submission without timestamp', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{
            ...submissionData,
            updatedAt: null
          }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(screen.getByText('16 days ago')).toBeVisible()
  })
  test('Should render acceptance message', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{
            ...submissionData,
            status: SubmissionStatus.Passed
          }}
        />
      </MockedProvider>
    )
    expect(
      screen.getByText((content, _element) =>
        content.startsWith('accepted submission on')
      )
    ).toBeVisible()
  })
  test('Should render acceptance message with no comment', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{
            ...submissionData,
            status: SubmissionStatus.Passed,
            comment: null,
            comments: null
          }}
        />
      </MockedProvider>
    )
    expect(
      screen.getByText((content, _element) =>
        content.startsWith('accepted submission on')
      )
    ).toBeVisible()
  })
  test('Accordion should be visible when accordion header is clicked', () => {
    const { container, getByText } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )

    const accordionHeader = getByText('Challenge Description')
    fireEvent.click(accordionHeader)

    const accordionItem = container.querySelector('.accordion__item')

    expect(accordionItem).toBeVisible()
  })
  test('Should change from comment to accept', async () => {
    expect.assertions(1)

    const { getByDisplayValue } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, status: 'open' }}
          session={dummySessionData}
        />
      </MockedProvider>
    )

    const radioComment = getByDisplayValue('comment')
    const radioAccept = getByDisplayValue('accept')

    fireEvent.click(radioAccept)

    expect(radioComment.checked).toBeFalsy()
  })
})
