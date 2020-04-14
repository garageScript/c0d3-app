jest.mock('../../pages/curriculum')
jest.mock('../../pages/home')
import React from 'react'
import Curriculum from '../../pages/curriculum'
import IndexPage from '../../pages/index'
import Home from '../../pages/home'
import { render } from '@testing-library/react'
import { fetcher } from '../../pages/_app'
import { AuthUserContext } from '../../pages/_app'

describe('Index Page', () => {
  test('fetcher should return a promise', async () => {
    window.fetch = () => Promise.resolve({json: () => 5})
    const data = await fetcher()
    expect(data).toEqual(5)
  })
  test('Should render curriculum if user is identified', async () => {
    Curriculum.mockReturnValue( <h1>Hello Curriculum</h1> )

    const user = { user: { username: 'test' } }
    const tree = (
      <AuthUserContext.Provider value={user}>
        <IndexPage /> /
      </AuthUserContext.Provider>
    )

    const { getByText } = render(tree)
    getByText('Hello Curriculum')
  })
  test('Should render home page if user is not identified', async () => {
    Home.mockReturnValue(<h1>Hello home</h1>)
    const tree = (
      <AuthUserContext.Provider value={false}>
        <IndexPage /> /
      </AuthUserContext.Provider>
    )
    
    const { getByText } = render(tree)
    getByText('Hello home')
  })
})