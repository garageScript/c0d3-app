jest.mock('../../helpers/useSession')
jest.mock('../../pages/curriculum')
jest.mock('../../components/LandingPage')
import React from 'react'
import { render } from '@testing-library/react'
import Curriculum from '../../pages/curriculum'
import IndexPage, {fetcher} from '../../pages/index'
import LandingPage from '../../components/LandingPage'
import useSession from '../../helpers/useSession'

describe('Index Page', () => {
  test('Should render curriculum if user is identified', async () => {
    useSession.mockReturnValue({
      data: { userInfo: { name:'tester', username: 'tester' } }
    })
    Curriculum.mockReturnValue( <h1>Hello Curriculum</h1> )

    const { getByText } = render(<IndexPage />)
    getByText('Hello Curriculum')
  })
  test('Should render landing page if user is not identified', async () => {
    useSession.mockReturnValue({
      error: undefined,
      data: { success: false, errorMessage: 'unauthorized' }
    })
    LandingPage.mockReturnValue(<h1>Hello Landing</h1>)
    
    const { getByText } = render(<IndexPage />)
    getByText('Hello Landing')
  })
  test('Should not render while page is loading', async () => {
    useSession.mockReturnValue({})
    
    const { container } = render(<IndexPage />)
    expect(container).toMatchSnapshot()
  })
})
