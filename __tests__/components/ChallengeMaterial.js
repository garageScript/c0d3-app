import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ChallengeMaterial from '../../components/ChallengeMaterial'

describe('Curriculum challenge page', () => {
  test('Should render appropriately when no challenges are passed to component', async () => {
    const { container } = render(<ChallengeMaterial />)
    await wait(() => {
      expect(container).toMatchSnapshot()
    })
  })

  const props = {
    challenges: [
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
    ],
    userSubmissionData: []
  }
  test('Should render first challenge by default', async () => {
    const { container } = render(<ChallengeMaterial {...props} />)
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
