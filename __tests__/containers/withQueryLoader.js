// jest.mock('@apollo/react-hooks')
import React from 'react'
import { render } from '@testing-library/react'
// import { useQuery } from '@apollo/react-hooks'
import withQueryLoader from '../../containers/withQueryLoader'
import LoadingSpinner from '../../components/LoadingSpinner'

describe('withQueryLoader HOC container', () => {
  test('Should return LoadingSpinner when loading', () => {
    // useQuery.mockReturnValue(() => {
    //   console.log('inside mock')
    //   return { loading: true, data: null }
    // })
    
    withQueryLoader({ query: null }, <h1>Component</h1>)
  })
  // test('useSession returns value from SWR fetch', () => {
  //   const returnValue = {
  //     data: { user: 'test', username: 'tester' },
  //     error: false
  //   }
  //   useSWR.mockReturnValue(returnValue)
    
  //   expect(useSession()).toEqual(returnValue)
  // })
})
