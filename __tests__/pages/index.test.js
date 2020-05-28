jest.mock('next/router')
import React from 'react'
import { Router } from 'next/router'
import { render } from '@testing-library/react'
import { useRouter } from 'next/router'
import IndexPage from '../../pages/index'
import SessionContext from '../../helpers/contexts/session'

describe('Index Page', () => {
  test('Should redirect to curriculum if session is identified', async () => {
    useRouter.mockImplementation(() => ({
      push: jest.fn()
    }))
    const session = {
      session: {
        user: {
          username: 'testing'
        }
      }
    }
    const tree = (
      <SessionContext.Provider value={session}>
        <IndexPage />
      </SessionContext.Provider>
    )

    render(tree)
    expect(Router.push).toBeCalled
  })

  test('Should render landing page if user is not logged in', async () => {
    const session = {
      session: {
        username: null
      }
    }
    const tree = (
      <SessionContext.Provider value={session}>
        <IndexPage />
      </SessionContext.Provider>
    )

    const { container } = render(tree)
    expect(container).toMatchSnapshot()
  })
})
