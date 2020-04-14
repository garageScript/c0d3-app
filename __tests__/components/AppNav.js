import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { AuthUserContext } from '../../pages/_app'
import AppNav from '../../components/AppNav'

describe('AppNav component', () => {
  test('Should render appropriately when user is logged in', () => {
    const user = { user: { username: 'test' } }

    const tree = (
      <AuthUserContext.Provider value={user}>
        <AppNav />
      </AuthUserContext.Provider>
    )

    const { container } = render(tree)
    expect(container).toMatchSnapshot()
  })

  test('Should render appropriately when user is not logged in', () => {
    const tree = (
      <AuthUserContext.Provider value={false}>
        <AppNav />
      </AuthUserContext.Provider>
    )

    const { container } = render(tree)
    expect(container).toMatchSnapshot()
  })
})
