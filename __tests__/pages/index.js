import React from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import Curriculum from '../../pages/curriculum'
import useSWR from 'swr'

describe('Index Page', () => {
  test('Should return empty string while loading', async () => {
    jest.mock('swr', () => {
      return jest.fn().mockReturnValue({
        data: {
          userInfo: {name:'tester'}
        }
      })
    })
    jest.mock('../../pages/curriculum', () => {
      return jest.fn().mockReturnValue( <h1>Hello Curriculum</h1> )
    })
    const IndexPage = require('../../pages').default
    const { getByText } = render(<IndexPage />)
    getByText('Hello Curriculum')
  })

})
