import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ChallengeMaterial from '../../components/ChallengeMaterial'

describe('Curriculum challenge page', () => {
  test('Should render appropriately when no challenges are passed to component', async () => {
    const { container } = render(
      <ChallengeMaterial challenges={[]} userSubmissions={[]} />
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
    userSubmissions: []
  }
  const propsWithSubmissions = {
    challenges,
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
    ]
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
