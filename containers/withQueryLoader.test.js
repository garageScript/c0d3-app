import { useQuery } from '@apollo/client'
import React from 'react'
import withQueryLoader from '../containers/withQueryLoader'
import { render, waitFor } from '@testing-library/react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useRouter } from 'next/router'
jest.mock('@apollo/client')

describe('withQueryLoader HOC container', () => {
  const { push } = useRouter()
  test('Should return LoadingSpinner when loading', () => {
    useQuery.mockReturnValue({ loading: true, data: null })
    expect(withQueryLoader({ query: null }, <h1>Component</h1>)()).toEqual(
      <LoadingSpinner />
    )
  })

  test('Should return Component when not loading and data is present', () => {
    useQuery.mockReturnValue({ loading: false, data: { a: 1 } })
    const Component = () => {
      return <h1>Component</h1>
    }

    expect(
      withQueryLoader({ query: null }, Component)({ title: 'test' })
    ).toEqual(<Component queryData={{ a: 1 }} title="test" />)
  })

  test('Should return No data when done loading and no data is present', async () => {
    useQuery.mockReturnValue({ loading: false, data: null })
    const Component = () => {
      return <h1>Component</h1>
    }
    render(withQueryLoader({ query: null }, Component)())
    await waitFor(() => expect(push).toBeCalledWith('/500'))
  })
})
