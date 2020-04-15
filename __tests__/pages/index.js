jest.mock('swr')
jest.mock('../../pages/curriculum')
jest.mock('../../pages/home')
import React from 'react'
import { render } from '@testing-library/react'
import Curriculum from '../../pages/curriculum'
import IndexPage, { fetcher } from '../../pages/index'
import Home from '../../pages/home'
import useSWR from 'swr'

describe('Index Page', () => {
  test('fetcher should return a promise', async () => {
    window.fetch = () => Promise.resolve({json: () => 5})
    const data = await fetcher()
    expect(data).toEqual(5)
  })

  test('Should render loading if no data', () => {
    useSWR.mockReturnValue({ data: false })
    const { getByText } = render(<IndexPage />)
    getByText('Loading')
  })

  test('Should render curriculum if user is identified', async () => {
    useSWR.mockReturnValue({
      data: { userInfo: { name:'tester' } }
    })

    Curriculum.mockReturnValue(<h1>Hello Curriculum</h1>)
    const { getByText } = render(<IndexPage />)
    getByText('Hello Curriculum')
  })

  test('Should render home page if user is not identified', async () => {
    useSWR.mockReturnValue({
      error: undefined,
      data: {
        success: false,
        errorMessage: "unauthorized"
      }
    })

    Home.mockReturnValue(<h1>Hello Home</h1>)
    
    const { getByText } = render(<IndexPage />)
    getByText('Hello Home')
  })
})