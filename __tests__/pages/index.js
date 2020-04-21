jest.mock('../../pages/curriculum')
jest.mock('../../components/LandingPage')
import React from 'react'
import { render } from '@testing-library/react'
import Curriculum from '../../pages/curriculum'
import IndexPage from '../../pages/index'
import LandingPage from '../../components/LandingPage'
import SessionContext from '../../helpers/contexts/session'

describe('Index Page', () => {
  test('Should render curriculum if user is identified', async () => {
    const session = { data: { success: true, userInfo: { name:'tester', username: 'tester' } } }
    const tree = (
      <SessionContext.Provider value={session}>
        <IndexPage />
      </SessionContext.Provider>
    )
    Curriculum.mockReturnValue( <h1>Hello Curriculum</h1> )

    const { getByText } = render(tree)
    getByText('Hello Curriculum')
  })
  test('Should render landing page if user is not identified', async () => {
    const session = { data: { success: false, errorMessage: 'unauthorized' } }
    const tree = (
      <SessionContext.Provider value={session}>
        <IndexPage />
      </SessionContext.Provider>
    )
    LandingPage.mockReturnValue(<h1>Hello Landing</h1>)
    
    const { getByText } = render(tree)
    getByText('Hello Landing')
  })
  test('Should not render while page is loading', async () => {
    // SessionContext default value is { data: { success: false } }
    const { container } = render(<IndexPage />)
    expect(container).toMatchSnapshot()
  })
})
