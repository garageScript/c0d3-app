import React from 'react'
import { render } from '@testing-library/react'
import ProgressCard from './ProgressCard'

describe('ProgressCard component', () => {
  it('should render correct lesson progress for 0% completion', () => {
    const { container } = render(<ProgressCard progressCount={0} />)
    expect(container).toMatchSnapshot()
  })
  it('should render correct lesson progress for 25% completion', () => {
    const { container } = render(<ProgressCard progressCount={25} />)
    expect(container).toMatchSnapshot()
  })
  it('should render correct lesson progress for 75% completion', () => {
    const { container } = render(<ProgressCard progressCount={75} />)
    expect(container).toMatchSnapshot()
  })
  it('should render correct lesson progress for 100% completion', () => {
    const { container } = render(<ProgressCard progressCount={100} />)
    expect(container).toMatchSnapshot()
  })
})
