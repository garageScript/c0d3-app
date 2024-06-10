import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewStatus from './ReviewStatus'
import { SubmissionStatus } from '../../graphql'

describe('ReviewComment component', () => {
  const data = {
    name: 'Admin',
    username: 'admin',
    date: '0'
  }
  it('Should not render message in open submissions for reviewer', () => {
    render(<ReviewStatus date="0" status={SubmissionStatus.Open} />)
    expect(screen.firstChild).toBeUndefined()
  })
  it('Should use "You" for student overwritten message', () => {
    render(
      <ReviewStatus
        date="0"
        status={SubmissionStatus.Overwritten}
        viewedByStudent
      />
    )
    expect(
      screen.getByText((content, _node) =>
        content.startsWith('You have overwritten this submission on ')
      )
    ).toBeVisible()
  })
  it('Should render accepted message', () => {
    render(
      <ReviewStatus
        {...data}
        comment="Good job!"
        status={SubmissionStatus.Passed}
      />
    )
    expect(
      screen.getByText((content, _node) =>
        content.includes('accepted submission on')
      )
    ).toBeVisible()
  })
  it('Should render rejected message', () => {
    render(
      <ReviewStatus
        {...data}
        comment="Error on line 3"
        status={SubmissionStatus.NeedMoreWork}
      />
    )
    expect(
      screen.getByText((content, _node) =>
        content.includes('requested changes on')
      )
    ).toBeVisible()
  })
  it('Should render overwritten message for reviewer', () => {
    render(<ReviewStatus date="0" status={SubmissionStatus.Overwritten} />)
    expect(
      screen.getByText((content, _node) =>
        content.includes('Student has overwritten this submission on')
      )
    ).toBeVisible()
  })
  it('Should render waiting message', () => {
    render(
      <ReviewStatus
        date="0"
        {...data}
        status={SubmissionStatus.Open}
        viewedByStudent
      />
    )
    expect(
      screen.getByText('Your submission is currently waiting to be reviewed.')
    ).toBeVisible()
  })
  it('Should throw if status is incorrect', () => {
    //supress console.log error message in tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ReviewStatus date="0" />)).toThrow()
  })
})
