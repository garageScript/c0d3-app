import React from 'react'
import dayjs from 'dayjs'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import ChallengeMaterial from './ChallengeMaterial'
import SET_STAR from '../graphql/queries/setStar'
import GET_LESSON_MENTORS from '../graphql/queries/getLessonMentors'
import lessonMentorsData from '../__dummy__/getLessonMentorsData'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'

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
  }
]

const lessonStatusNoPass = {
  isEnrolled: '213423534',
  isTeaching: null,
  starGiven: ''
}

const challenges = [
  {
    id: '105',
    description:
      'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
    title: 'Greater than 5',
    order: 0,
    __typename: 'Challenge'
  },
  {
    id: '107',
    description:
      'Write a function that takes in 2 numbers and returns their sum.',
    title: 'Sum of 2 Numbers',
    order: 1,
    __typename: 'Challenge'
  }
]

const userSubmissions = [
  {
    id: '3500',
    status: 'open',
    mrUrl: 'github.com/testmrurl',
    diff:
      'diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n',
    viewCount: 0,
    comment: null,
    challengeId: '105',
    reviewer: null,
    createdAt: '1586907809223',
    updatedAt: dayjs().subtract(16, 'day').valueOf()
  },
  {
    id: '3501',
    status: 'needMoreWork',
    mrUrl: 'github.com/testmrurl2',
    diff:
      'diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n',
    viewCount: 0,
    comment: 'test comment',
    challengeId: '107',
    reviewer: {
      id: '1',
      username: 'dan'
    },
    createdAt: '1586907809223',
    updatedAt: dayjs().subtract(16, 'day').valueOf()
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

  test('Should render appropriately when no challenges are passed to component', async () => {
    props.challenges = []
    props.userSubmissions = []
    const { container } = render(<ChallengeMaterial {...props} />)
    expect(container).toMatchSnapshot()
  })

  test('Should render first challenge by default when user has no submissions', async () => {
    props.userSubmissions = []
    const { container } = render(<ChallengeMaterial {...props} />)
    expect(container).toMatchSnapshot()
  })

  test('Should render clicked challenge within challenge question', async () => {
    const { getAllByTestId, container } = render(
      <ChallengeMaterial {...props} />
    )
    const challengeTitleCard = getAllByTestId('challenge-title')[1]
    fireEvent.click(challengeTitleCard)
    expect(container).toMatchSnapshot()
  })

  test('Should render first challenge that is not passed when user has submissions', async () => {
    const { container } = render(<ChallengeMaterial {...props} />)
    expect(container).toMatchSnapshot()
  })

  test('Should render challenge material page differently when user has passed all their challenges', async () => {
    const { lessonStatus, userSubmissions } = props
    lessonStatus.isPassed = 'cmon bruh ive passed already'
    userSubmissions.forEach(submission => (submission.status = 'passed'))
    const { container, getByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChallengeMaterial {...props} />
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
    global.window.innerWidth = 500
    const { container } = render(
      <ChallengeMaterial {...{ ...props, show: true }} />
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
      <ChallengeMaterial {...{ ...props, show: true }} />
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
})
