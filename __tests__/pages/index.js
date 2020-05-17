jest.mock('../../pages/curriculum')
jest.mock('../../components/AppNav')
jest.mock('../../components/LandingPage')
jest.mock('../../components/Footer')
import React from 'react'
import { render } from '@testing-library/react'
import Curriculum from '../../pages/curriculum'
import IndexPage from '../../pages/index'
import LandingPage from '../../components/LandingPage'
import Footer from '../../components/Footer'
import AppNav from '../../components/AppNav'
import SessionContext from '../../helpers/contexts/session'

describe('Index Page', () => {
  Footer.mockReturnValue(<h1>Footer</h1>)
  AppNav.mockReturnValue(<h1>AppNav</h1>)
  LandingPage.mockReturnValue(<h1>LandingPage</h1>)
  Curriculum.mockReturnValue(<h1>Hello Curriculum</h1>)

  test('Should render curriculum if session is identified', async () => {
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

    const { getByText } = render(tree)
    getByText('Hello Curriculum')
  })

  test('Should render landing page if user is not identified', async () => {
    const session = { session: null }
    const tree = (
      <SessionContext.Provider value={session}>
        <IndexPage />
      </SessionContext.Provider>
    )

    const { getByText } = render(tree)
    getByText('LandingPage')
    getByText('Footer')
  })
  test('Should not render while page is loading', async () => {
    // SessionContext default value is { data: { success: false } }
    const { container } = render(<IndexPage />)
    expect(container).toMatchSnapshot()
  })
})
