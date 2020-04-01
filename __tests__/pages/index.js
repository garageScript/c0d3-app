jest.mock('swr')
jest.mock('../../pages/curriculum')
jest.mock('../../components/LandingPage')
import React from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import Curriculum from '../../pages/curriculum'
import IndexPage, {fetcher} from '../../pages/index'
import LandingPage from '../../components/LandingPage'
import useSWR from 'swr'

describe('Index Page', () => {
  test('function', async () => {
    window.fetch = () => Promise.resolve({json: () => 5})
    const data = await fetcher()
    expect(data).toEqual(5)
  })
  test('Should render curriculum', async () => {
    useSWR.mockReturnValue({
      data: {
        userInfo: {name:'tester'}
      }
    })
    Curriculum.mockReturnValue( <h1>Hello Curriculum</h1> )

    const { getByText } = render(<IndexPage />)
    getByText('Hello Curriculum')
  })
  test('Should return IndexPage', async () => {
    useSWR.mockReturnValue({
      error: undefined,
      data: {
        success: false,
        errorMessage: "unauthorized"
      }
    })
    // IndexPage.mockReturnValue( <h1>Hello Landing</h1> )
    LandingPage.mockReturnValue(<h1>Hello Landing</h1>)
    // const { getByText } = render(<LandingPage />)
    const { getByText } = render(<IndexPage />)
    getByText('Hello Landing')
  })
  test('Should return empty string', async () => {
    useSWR.mockReturnValue({})

    const { container } = render(<IndexPage />)
    expect(container).toMatchSnapshot()
  })
  
})
