jest.mock('@apollo/react-hooks')
import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ForgotPassword from '../../pages/forgotpassword'
import { useMutation } from '@apollo/react-hooks'

const mockFn = jest.fn()

describe('<ForgotPassword />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('It should render reset password form', async () => {
    useMutation.mockReturnValue([mockFn, { data: null }])
    const { container } = render(<ForgotPassword />)
    await wait(() => expect(container).toMatchSnapshot())
  })
  test('It should render password reset instructions sent', () => {
    useMutation.mockReturnValue([
      mockFn,
      { data: { success: true, token: 'faketoken' } }
    ])
    const { container } = render(<ForgotPassword />)
    expect(container).toMatchSnapshot()
  })
  test('It should render reset password form and call reqPwReset ', async () => {
    useMutation.mockReturnValue([mockFn, { data: null }])
    const { getByTestId } = render(<ForgotPassword />)
    const submitButton = getByTestId('submit')
    const userOrEmail = getByTestId('userOrEmail')

    await wait(() => {
      fireEvent.change(userOrEmail, {
        target: {
          value: 'somefakeuser'
        }
      })
      fireEvent.click(submitButton)
    })
    expect(mockFn).toBeCalledWith({
      variables: { userOrEmail: 'somefakeuser' }
    })
  })
  test('It should render invalid user/email form', () => {
    useMutation.mockReturnValue([mockFn, { data: null, error: 'fake Error' }])
    const { container } = render(<ForgotPassword />)
    expect(container).toMatchSnapshot()
  })
})
