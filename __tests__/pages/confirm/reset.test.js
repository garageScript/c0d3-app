jest.mock('@apollo/react-hooks')
import React from 'react'
import { render, fireEvent, wait, getByTestId } from '@testing-library/react'
import { useMutation } from '@apollo/react-hooks'
import ResetPassword from '../../../pages/confirm/[token]'
import { withTestRouter } from '../../../testUtil/withNextRouter'

const mockFn = jest.fn()

describe('<ResetPassword />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('It should render password form', async () => {
    useMutation.mockReturnValue([mockFn, {}])
    const { container } = render(<ResetPassword />)
    expect(container).toMatchSnapshot()
  })

  test('It should render Password has been set card', async () => {
    useMutation.mockReturnValue([
      mockFn,
      { data: { changePw: { success: true } } }
    ])
    const { container } = render(<ResetPassword />)
    expect(container).toMatchSnapshot()
  })

  test('It should render password form and call mutation', async () => {
    const tree = withTestRouter(<ResetPassword />, {
      push: jest.fn(),
      query: { token: 'faketoken123' }
    })
    useMutation.mockReturnValue([mockFn, {}])
    const { getByTestId } = render(tree)
    const submitButton = getByTestId('submit')
    const passwordBox = getByTestId('password')
    const confirmPasswordbox = getByTestId('confirmPassword')

    await wait(() => {
      fireEvent.change(passwordBox, {
        target: {
          value: 'password123'
        }
      })
      fireEvent.change(confirmPasswordbox, {
        target: {
          value: 'password123'
        }
      })
      fireEvent.click(submitButton)
    })
    expect(mockFn).toBeCalledWith({
      variables: {
        password: 'password123',
        token: 'faketoken123'
      }
    })
  })

  test('It should render alert banner when there is an error', () => {
    useMutation.mockReturnValue([mockFn, { error: 'some error' }])
    const { container } = render(<ResetPassword />)
    expect(container).toMatchSnapshot()
  })
})
