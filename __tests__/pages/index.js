jest.mock('swr')
jest.mock('../../pages/curriculum')
jest.mock('../../components/LandingPage')
import React from 'react'
import useSWR from 'swr'
import Curriculum from '../../pages/curriculum'
import IndexPage from '../../pages/index'
import LandingPage from '../../components/LandingPage'
import { render } from '@testing-library/react'
import { fetcher } from '../../pages/_app'

describe('Index Page', () => {
  test('fetcher should return a promise', async () => {
    window.fetch = () => Promise.resolve({json: () => 5})
    const data = await fetcher()
    expect(data).toEqual(5)
  })
  test('Should render curriculum if user is identified', async () => {
    useSWR.mockReturnValue({
      data: {
        userInfo: { name:'tester' }
      }
    })
    Curriculum.mockReturnValue( <h1>Hello Curriculum</h1> )

    const { getByText } = render(<IndexPage />)
    getByText('Hello Curriculum')
  })
  test('Should render landing page if user is not identified', async () => {
    useSWR.mockReturnValue({
      error: undefined,
      data: {
        success: false,
        errorMessage: "unauthorized"
      }
    })
    LandingPage.mockReturnValue(<h1>Hello Landing</h1>)
    
    const { getByText } = render(<IndexPage />)
    getByText('Hello Landing')
  })
  test('Should not render while page is loading', async () => {
    useSWR.mockReturnValue({})
    
    const { container } = render(<IndexPage />)
    expect(container).toMatchSnapshot()
  })
  
})
