import React from 'react'
import { render } from '@testing-library/react'
import ProgressCard from './ProgressCard'

describe('ProgressCard component renders correctly when user is logged in', () => {
  it('should render correct lesson progress for 0% completion', () => {
    const { container } = render(<ProgressCard progressCount={0} loggedIn />)
    expect(container).toMatchSnapshot()
  })
  it('should render correct lesson progress for 25% completion', () => {
    const { container } = render(<ProgressCard progressCount={25} loggedIn />)
    expect(container).toMatchSnapshot()
  })
  it('should render correct lesson progress for 75% completion', () => {
    const { container } = render(<ProgressCard progressCount={75} loggedIn />)
    expect(container).toMatchSnapshot()
  })
  it('should render correct lesson progress for 100% completion', () => {
    const { container } = render(<ProgressCard progressCount={100} loggedIn />)
    expect(container).toMatchSnapshot()
  })
})

describe('ProgressCard component renders correctly when user is not logged in', () => {
  it('should not render lesson progress if a user is not logged in', () => {
    const { container } = render(
      <ProgressCard progressCount={0} loggedIn={false} />
    )
    expect(container).toMatchSnapshot()
  })
})
