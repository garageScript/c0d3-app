import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewerProfile from './ReviewerProfile'

describe('ReviewerProfile test', () => {
  test('Should render default component', () => {
    const { container } = render(
      <ReviewerProfile name="User User" username="user" />
    )
    expect(screen.getByText('@user')).toBeVisible()
    expect(container).toMatchSnapshot()
  })
  test('Should use inline comment if props is passed', () => {
    const { container } = render(
      <ReviewerProfile name="User User" username="user" inline />
    )
    expect(screen.getByText('@user')).toBeVisible()
    expect(container.firstChild.classList.contains('wrapper')).toBe(true)
  })
})
