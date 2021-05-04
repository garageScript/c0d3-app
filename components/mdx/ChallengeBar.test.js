import React from 'react'
import { render } from '@testing-library/react'
import ChallengeBar from './ChallengBar'
describe('ChallengeBar component', () => {
  test('Should created redirect based on input', () => {
    const { container } = render(<ChallengeBar src="/foo" />)
    expect(container).toMatchSnapshot()
  })
})
