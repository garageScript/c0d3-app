import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { AdminLayout } from './AdminLayout'
import { useRouter } from 'next/router'

describe('AdminLayout test', () => {
  const { push } = useRouter()
  test('Should return loading spinner when loading', async () => {
    const { findByRole } = render(
      <MockedProvider addTypename={false}>
        <AdminLayout data={{ loading: true }} />
      </MockedProvider>
    )
    const element = await findByRole('heading', { name: /loading/i })
    expect(element).toBeTruthy()
  })
  test('Should return Error on error', async () => {
    const { findByText } = render(
      <MockedProvider addTypename={false}>
        <AdminLayout data={{ error: true }} />
      </MockedProvider>
    )
    const element = await findByText(/Internal server error/i)
    expect(element).toBeTruthy()
  })
  test('Should redirect to login page if no session', async () => {
    render(
      <MockedProvider addTypename={false}>
        <AdminLayout data={{ data: {} }} />
      </MockedProvider>
    )
    await waitFor(() => expect(push).toBeCalledWith('/login'))
  })
  test('Should render children', async () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <AdminLayout
          data={{
            session: {
              user: {
                isAdmin: 'true'
              }
            }
          }}
        >
          <h1>Test title</h1>
        </AdminLayout>
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
