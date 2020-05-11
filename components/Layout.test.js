import React from 'react'
import { render } from '@testing-library/react'
import Layout from './Layout'
import SessionContext from '../helpers/contexts/session'

describe('Layout Component', () => {
  test('Should render correctly when no user in session', () => {
    const session = { data: null }
    const tree = (
      <SessionContext.Provider value={session}>
        <Layout />
      </SessionContext.Provider>
    )

    const { container } = render(tree)
    expect(container).toMatchSnapshot()
  })

  test('Should render correctly when user session found', () => {
    const session = {
      data: { userInfo: { name: 'tester', username: 'tester' } }
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
