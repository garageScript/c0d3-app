jest.mock('@apollo/react-hooks')
import React from 'react'
import { render } from '@testing-library/react'
import Layout from '../../components/Layout'
import SessionContext from '../../helpers/contexts/session'
import { useMutation } from '@apollo/react-hooks'

describe('Layout Component', () => {
  test('Should render correctly when no user in session', () => {
    const session = { session: null }
    const tree = (
      <SessionContext.Provider value={session}>
        <Layout />
      </SessionContext.Provider>
    )

    const { container } = render(tree)
    expect(container).toMatchSnapshot()
  })

  test('Should render correctly when user session found', () => {
    useMutation.mockReturnValue([jest.fn(), { data: {} }])
    const session = {
      session: {
        user: {
          username: 'test'
        }
      }
    }
    const tree = (
      <SessionContext.Provider value={session}>
        <Layout />
      </SessionContext.Provider>
    )

    const { container } = render(tree)
    expect(container).toMatchSnapshot()
  })

  test('Should render correct with no session context', () => {
    const { container } = render(<Layout />)
    expect(container).toMatchSnapshot()
  })
})
