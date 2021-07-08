import React, { useContext, useEffect } from 'react'
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  screen
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChallengeMaterial from './ChallengeMaterial'
import { MockedProvider } from '@apollo/client/testing'
import ADD_COMMENT from '../graphql/queries/addComment'
import SET_STAR from '../graphql/queries/setStar'
import GET_PREVIOUS_SUBMISSIONS from '../graphql/queries/getPreviousSubmissions'
import GET_LESSON_MENTORS from '../graphql/queries/getLessonMentors'
import lessonMentorsData from '../__dummy__/getLessonMentorsData'
import '@testing-library/jest-dom'
import { SubmissionStatus } from '../graphql'
import getPreviousSubmissionsData from '../__dummy__/getPreviousSubmissionsData'
import dummySessionData from '../__dummy__/sessionData'
import { ContextProvider, GlobalContext } from '../helpers/globalContext'
import _ from 'lodash'

const getPreviousSubmissionsMock = {
  request: {
    query: GET_PREVIOUS_SUBMISSIONS,
    variables: { challengeId: 9, userId: 1 }
  },
  result: {
    data: getPreviousSubmissionsData
  }
}

const mocks = [
  {
    request: {
      query: SET_STAR,
      variables: { mentorId: 4, lessonId: 5, comment: '1' }
    },
    result: {
      data: { setStar: { success: true } }
    }
  },
  {
    request: { query: GET_LESSON_MENTORS, variables: { lessonId: '5' } },
    result: {
      data: { getLessonMentors: lessonMentorsData }
    }
  },
  {
    request: {
      query: ADD_COMMENT,
      variables: {
        submissionId: 3502,
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
  },
  {
    ...getPreviousSubmissionsMock,
    request: {
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { challengeId: 105, userId: 1 }
    }
  },
  {
    request: {
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { challengeId: 107, userId: 1 }
    },
    result: {
      data: {
        getPreviousSubmissions: [
          getPreviousSubmissionsData.getPreviousSubmissions[0]
        ]
      }
    }
  },
  getPreviousSubmissionsMock,
  getPreviousSubmissionsMock
]

const lessonStatusNoPass = {
  isEnrolled: '213423534',
  isTeaching: null,
  starGiven: ''
}

const challenges = [
  {
    id: 105,
    description:
      'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
    title: 'Greater than 5',
    order: 0,
    __typename: 'Challenge'
  },
  {
    id: 107,
    description:
      'Write a function that takes in 2 numbers and returns their sum.',
    title: 'Sum of 2 Numbers',
    order: 1,
    __typename: 'Challenge'
  }
]

const userSubmissions = [
  {
    id: 3500,
    status: SubmissionStatus.Open,
    mrUrl: 'github.com/testmrurl',
    diff: null,
    viewCount: 0,
    comment: null,
    challengeId: 105,
    reviewer: null,
    createdAt: '1586907809223',
    updatedAt: '1624086000000',
    comments: [
      {
        author: {
          name: 'Admin Admin',
          username: 'admin'
        },
        authorId: 1,
        submissionId: 1,
        content: 'A comment under submission'
      }
    ],
    user: {
      id: 3
    }
  },
  {
    id: 3501,
    status: SubmissionStatus.NeedMoreWork,
    mrUrl: 'github.com/testmrurl2',
    diff: 'diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n',
    viewCount: 0,
    comment: 'test comment',
    challengeId: 107,
    reviewer: {
      id: '1',
      username: 'dan'
    },
    createdAt: '1586907809223',
    updatedAt: '1624086000000',
    comments: [
      {
        author: {
          name: 'Admin Admin',
          username: 'admin'
        },
        authorId: 1,
        submissionId: 1,
        content: 'A comment under submission'
      }
    ],
    user: {
      id: 3
    }
  },
  {
    id: 3502,
    status: 'open',
    mrUrl: 'github.com/testmrurl',
    diff: 'diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n',
    viewCount: 0,
    comment: null,
    challengeId: 105,
    reviewer: {
      id: '1',
      username: 'dan'
    },
    createdAt: '1586907809223',
    updatedAt: '1624125892130',
    comments: [
      {
        author: {
          name: 'Admin Admin',
          username: 'admin'
        },
        authorId: 1,
        submissionId: 1,
        content: 'A comment under submission'
      }
    ],
    user: {
      id: 3
    }
  }
]

describe('Curriculum challenge page', () => {
  let props
  const setShow = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    props = {
      challenges,
      lessonStatus: lessonStatusNoPass,
      userSubmissions,
      chatUrl: 'https://chat.c0d3.com/c0d3/channels/js0-foundations',
      lessonId: '5',
      setShow
    }
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  // TODO: Determine why this test conflicts with test #2 (it wont work if test 2 runs first)
  test('Should be able to select another challenge', async () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2021-7-5'))
    const copyProps = _.cloneDeep(props)
    const { lessonStatus, userSubmissions } = copyProps
    lessonStatus.isPassed = false
    userSubmissions.forEach(
      submission => (submission.status = SubmissionStatus.Open)
    )
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...copyProps} />
      </MockedProvider>
    )
    await screen.findByText('Select submission')
    userEvent.click(screen.getByText('1. Sum of 2 Numbers'))
    await screen.findByText('Select submission')
    expect(container).toMatchSnapshot()
  })
  test('Should select previous iterations', async () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2021-7-5'))
    const copyProps = _.cloneDeep(props)
    const { lessonStatus, userSubmissions } = copyProps
    lessonStatus.isPassed = false
    userSubmissions.forEach(
      submission => (submission.status = SubmissionStatus.Open)
    )
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...copyProps} />
      </MockedProvider>
    )
    await screen.findByText('Select submission')
    expect(
      await screen.findByRole('button', { name: '3 2 comment count' })
    ).toHaveClass('btn-info')
    userEvent.click(screen.getByTestId('iteration 1'))
    expect(
      await screen.findByRole('button', { name: '3 2 comment count' })
    ).not.toHaveClass('btn-info')
    expect(container).toMatchSnapshot()
  })
  test('Should not render diff if submission was not send', async () => {
    const copyProps = _.cloneDeep(props)
    copyProps.userSubmissions = [userSubmissions[0]]
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...copyProps} />
      </MockedProvider>
    )
    await screen.findByText('Select submission')
    userEvent.click(screen.getByText('1. Sum of 2 Numbers'))
    expect(
      screen.queryByText((_content, node) =>
        node.textContent.includes('Submitted a ')
      )
    ).toBeNull()
    expect(container).toMatchSnapshot()
  })
  test('Should render appropriately when no challenges are passed to component', async () => {
    props.challenges = []
    props.userSubmissions = []
    const { container } = render(<ChallengeMaterial {...props} />)
    expect(container).toMatchSnapshot()
  })

  test('Should render first challenge by default when user has no submissions', async () => {
    props.userSubmissions = []
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render clicked challenge within challenge question', async () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2021-7-5'))
    const { getAllByTestId, container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
      </MockedProvider>
    )
    const challengeTitleCard = getAllByTestId('challenge-title')[1]
    fireEvent.click(challengeTitleCard)
    expect(container).toMatchSnapshot()
  })

  test('Should render first challenge that is not passed when user has submissions', async () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2021-7-5'))
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  // TODO: fix this leaky side effect (some tests after this test are dependant on the prop mutation)
  test('Should render challenge material page differently when user has passed all their challenges', async () => {
    const copyProps = _.cloneDeep(props)

    const { lessonStatus, userSubmissions } = copyProps // TODO: this should be a cloned prop
    lessonStatus.isPassed = 'cmon bruh ive passed already'
    userSubmissions.forEach(
      submission => (submission.status = SubmissionStatus.Passed)
    )
    const { container, getByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...copyProps} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()

    await waitFor(() =>
      fireEvent.click(getByRole('button', { name: 'Give Star' }))
    )
    await waitFor(() => queryByText('Who helped you the most?'))
    expect(document.body).toMatchSnapshot()

    // click exit button of GiveStarCard
    fireEvent.click(getByRole('img'))
    expect(document.body).toMatchSnapshot()
  })
  test('Should hide mobile modal on click', async () => {
    // ADDED TO NOT MESS UP SCREEN SHOT
    const copyProps = _.cloneDeep(props)
    const { lessonStatus, userSubmissions } = copyProps
    lessonStatus.isPassed = 'cmon bruh ive passed already'
    userSubmissions.forEach(
      submission => (submission.status = SubmissionStatus.Passed)
    )
    // COULD REMOVE IF UPDATE SCREEN SHOT??
    global.window.innerWidth = 500
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...{ ...copyProps, show: true }} />
      </MockedProvider>
    )
    expect(screen.getByTestId('modal-challenges')).toBeVisible()
    expect(container).toMatchSnapshot()

    fireEvent.click(screen.getByText('0. Greater than 5'), {
      target: { innerText: '0. Greater than 5' }
    })
    expect(setShow).toBeCalledWith(false)
  })
  test('Should hide mobile modal by clicking on the background', async () => {
    global.window.innerWidth = 500
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...{ ...props, show: true }} />
      </MockedProvider>
    )
    expect(screen.getByTestId('modal-challenges')).toBeVisible()
    fireEvent.keyDown(container, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })
    expect(setShow).toBeCalledWith(false)
  })
  test('Should be able to add comments', async () => {
    const { lessonStatus, userSubmissions } = props
    lessonStatus.isPassed = false
    userSubmissions.forEach(
      submission => (submission.status = SubmissionStatus.Open)
    )
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
      </MockedProvider>
    )
    userEvent.type(screen.getByTestId('textbox'), 'A very unique test comment!')
    fireEvent.click(screen.getByText('Comment'))
    expect(screen.findByText('A very unique test comment!')).toBeTruthy()
  })
  test('Should use default case if no status is provided', async () => {
    userSubmissions.forEach(submission => (submission.status = 'foobar'))
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
      </MockedProvider>
    )
    expect(screen.getByText('A comment under submission')).toBeVisible()
  })
  test('Should render empty div if there is no submission data', () => {
    props.userSubmissions = []
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
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
            <ChallengeMaterial {...props} />
          </Wrapper>
        </MockedProvider>
      </ContextProvider>
    )

    expect(
      screen.getByText('Error while retrieving userinfo from context')
    ).toBeVisible()
  })
})
