import React from 'react'
import { useRouter } from 'next/router'
import useRedirectUnauthenticated from './useRedirectUnauthenticated'
import { LOGIN_PATH } from '../constants'
import { render } from '@testing-library/react'

const DummyComponent = () => {
  useRedirectUnauthenticated(true)
  return <></>
}

describe('useRedirectUnauthenticated helper', () => {
  const { push, asPath } = useRouter()

  it('Should redirect to /login if shouldRedirect is true', () => {
    expect.assertions(1)

    render(<DummyComponent />)

    expect(push).toBeCalledWith({
      pathname: LOGIN_PATH,
      query: { next: asPath }
    })
  })
})
