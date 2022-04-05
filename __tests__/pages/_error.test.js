import '../../__mocks__/next-auth/nextAuthAPI.mock'
import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import MyError from '../../pages/_error'
import * as Sentry from '@sentry/browser'
jest.spyOn(Sentry, 'captureException')

describe('_error page', () => {
  test('Should return Error 500 component', async () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <MyError
          code={500}
          hasGetInitialPropsRun={true}
          err={new Error('test error')}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    expect(Sentry.captureException).not.toHaveBeenCalled()
  })
  test('Should capture error when component is loading', async () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <MyError
          code={505}
          hasGetInitialPropsRun={false}
          err={new Error('test error')}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    expect(Sentry.captureException).toHaveBeenCalled()
  })
  test('Should capture browser error', async () => {
    const input = {
      err: { statusCode: 501 },
      asPath: '/pages/someComponent'
    }
    expect(await MyError.getInitialProps(input)).toEqual({
      code: 501,
      hasGetInitialPropsRun: true
    })

    expect(Sentry.captureException).toHaveBeenCalledWith({ statusCode: 501 })
  })
  test('Should capture server error', async () => {
    const input = {
      res: { statusCode: 505 },
      asPath: '/pages/someComponent'
    }
    expect(await MyError.getInitialProps(input)).toEqual({
      code: 505,
      hasGetInitialPropsRun: true
    })

    expect(Sentry.captureException).toHaveBeenCalledWith(
      new Error(
        `_error.js getInitialProps missing data at path: /pages/someComponent`
      )
    )
  })
  test('Should capture unexpected error', async () => {
    const input = {
      asPath: '/pages/someComponent'
    }
    expect(await MyError.getInitialProps(input)).toEqual({
      code: 404,
      hasGetInitialPropsRun: true
    })

    expect(Sentry.captureException).toHaveBeenCalledWith(
      new Error(
        `_error.js getInitialProps missing data at path: /pages/someComponent`
      )
    )
  })
})
