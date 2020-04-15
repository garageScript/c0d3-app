jest.mock('next/router')
import React from 'react'
import { render } from '@testing-library/react'
import { AuthUserContext } from '../../pages/index'
import AppNav, { AuthLinks, UnAuthLinks } from '../../components/AppNav'
import { useRouter } from 'next/router'

useRouter.mockReturnValue({
  route: null
})

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

describe('AuthLinks component', () => {
  test('Should render no active link when passed nothing', () => {
    const { container } = render(<AuthLinks />)
    expect(container.querySelectorAll('.active')).toHaveLength(0)
  })

  test('Should render active curriculumn link correctly', () => {
    const { container } = render(<AuthLinks active="/curriculum" />)
    const $active = container.querySelectorAll('.active')
    expect($active).toHaveLength(1)
    expect($active[0].attributes['href'].value).toEqual('/curriculum')
  })
})

describe('UnAuthLinks component', () => {
  test('Should render no active link when passed nothing', () => {
    const { container } = render(<UnAuthLinks />)
    expect(container.querySelectorAll('.active')).toHaveLength(0)
  })

  test('Should render active home link correctly', () => {
    const { container } = render(<UnAuthLinks active="/" />)
    const $active = container.querySelectorAll('.active')
    expect($active).toHaveLength(1)
    expect($active[0].attributes['href'].value).toEqual('/')
  })

  test('Should render active learning link correctly', () => {
    const { container } = render(<UnAuthLinks active="/#learning" />)
    const $active = container.querySelectorAll('.active')
    expect($active).toHaveLength(1)
    expect($active[0].attributes['href'].value).toEqual('/#learning')
  })
})
