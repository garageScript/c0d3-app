import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ChallengeMaterial from '../../components/ChallengeMaterial'


describe('Curriculum challenge page', () => {
const lessonStatusNoPass = {
  isEnrolled: '213423534',
  isPassed: null,
  isTeaching: null
}
  test('Should render appropriately when no challenges are passed to component', async () => {
    const { container } = render(
      <ChallengeMaterial 
        challenges={[]} 
        userSubmissions={[]} 
        lessonStatus={lessonStatusNoPass}
        chatUrl='https://chat.c0d3.com/c0d3/channels/js0-foundations'
        lessonId="5"
      />
    )
    await wait(() => {
      expect(container).toMatchSnapshot()
    })
  })
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
  const props = {
    challenges,
    lessonStatus: lessonStatusNoPass,
    userSubmissions: [],
    chatUrl: 'https://chat.c0d3.com/c0d3/channels/js0-foundations',
    lessonId: 5
  }
  const propsWithSubmissions = {
    challenges,
    lessonStatus: lessonStatusNoPass,
    userSubmissions: [
      {
        id: '3500',
        status: 'open',
        mrUrl: 'github.com/testmrurl',
        diff: 'test diff1',
        viewCount: 0,
        comment: null,
        challengeId: '105',
        reviewer: null,
        createdAt: '1586907809223',
        updatedAt: '1586907825090'
      },
      {
        id: '3501',
        status: 'needMoreWork',
        mrUrl: 'github.com/testmrurl2',
        diff: 'test diff2',
        viewCount: 0,
        comment: 'test comment',
        challengeId: '107',
        reviewer: {
          id: '1',
          username: 'dan'
        },
        createdAt: '1586907809223',
        updatedAt: '1586907825090'
      }
    ],
    chatUrl: 'https://chat.c0d3.com/c0d3/channels/js0-foundations',
    lessonId: 5
  }

const lessonStatusPassed = {
  isEnrolled: '213423534',
  isPassed: '123456789',
  isTeaching: null
}
  const propsWithSubmissionsPassed = {
    challenges,
    lessonStatus: lessonStatusPassed,
    userSubmissions: [
      {
        id: '3500',
        status: 'passed',
        mrUrl: 'github.com/testmrurl',
        diff: 'test diff1',
        viewCount: 0,
        comment: null,
        challengeId: '105',
        reviewer: null,
        createdAt: '1586907809223',
        updatedAt: '1586907825090'
      },
      {
        id: '3501',
        status: 'passed',
        mrUrl: 'github.com/testmrurl2',
        diff: 'test diff2',
        viewCount: 0,
        comment: 'test comment',
        challengeId: '107',
        reviewer: {
          id: '1',
          username: 'dan'
        },
        createdAt: '1586907809223',
        updatedAt: '1586907825090'
      }
    ],
    chatUrl: 'https://chat.c0d3.com/c0d3/channels/js0-foundations',
    lessonId: 5
  }

  test('Should render first challenge by default when user has no submissions', async () => {
    const { container } = render(<ChallengeMaterial {...props} />)
    expect(container).toMatchSnapshot()
  })
  test('Should render first challenge that is not passed when user has submissions', async () => {
    const { container } = render(
      <ChallengeMaterial {...propsWithSubmissions} />
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render challenge material page differently when user has passed all their challenges', async () => {
    const { container } = render(
      <ChallengeMaterial {...propsWithSubmissionsPassed} />
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render clicked challenge within challenge question', async () => {
    const { getAllByTestId, container } = render(
      <ChallengeMaterial {...props} />
    )
    const challengeTitleCard = getAllByTestId('challenge-title')[1]
    await wait(() => {
      fireEvent.click(challengeTitleCard), expect(container).toMatchSnapshot()
    })
  })
})
