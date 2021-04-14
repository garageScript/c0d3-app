import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import IndexPage, { getServerSideProps } from '../../pages/index'
import GET_APP from '../../graphql/queries/getApp'

describe('Index Page', () => {
  test('Should render index page', async () => {
    const { container } = render(
      <MockedProvider
        mocks={[
          {
            request: { query: GET_APP },
            result: {
              data: {
                session: null,
                lessons: [],
                alerts: []
              }
            }
          }
        ]}
        addTypename={false}
      >
        <IndexPage />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should redirect to /curriculum if connect.sid exists', async () => {
    expect(
      await getServerSideProps({ req: { cookies: { 'connect.sid': 'test' } } })
    ).toEqual({
      redirect: {
        destination: '/curriculum',
        permanent: false
      }
    })
  })
  test('Should not redirect without a cookie', async () => {
    expect(await getServerSideProps({ req: { cookies: {} } })).toEqual({
      props: {}
    })
  })
})
