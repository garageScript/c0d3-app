import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent, wait, cleanup } from '@testing-library/react'
import { Formik } from 'formik'
import Signup from '../../pages/signup'

test('Should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Signup />, div)
})

test.skip('Should submit values', async () => {
  const submitSignup = jest.fn()
  const initialValues = {
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }
  const expectedValue = {
    email: 'email@domain.com',
    username: 'user name',
    password: 'password123',
    firstName: 'user',
    lastName: 'name'
  }

  const { container } = await render(
    <Signup onSubmit={submitSignup}>
      <Formik initialValues={initialValues} onSubmit={submitSignup} />
    </Signup>
  )
  const emailField = container.querySelector('[name="email"]')
  const usernameField = container.querySelector('[name="username"]')
  const passwordField = container.querySelector('[name="password"]')
  const firstNameField = container.querySelector('[name="firstName"]')
  const lastNameField = container.querySelector('[name="lastName"]')
  const submitButton = container.querySelector('[type="submit"]')

  await wait(() =>
    fireEvent.change(emailField, {
      target: {
        value: 'email@domain.com'
      }
    })
  )

  await wait(() =>
    fireEvent.change(usernameField, {
      target: {
        value: 'user name'
      }
    })
  )

  await wait(() =>
    fireEvent.change(passwordField, {
      target: {
        value: 'password123'
      }
    })
  )

  await wait(() =>
    fireEvent.change(firstNameField, {
      target: {
        value: 'user'
      }
    })
  )

  await wait(() =>
    fireEvent.change(lastNameField, {
      target: {
        value: 'name'
      }
    })
  )

  await wait(() => fireEvent.click(submitButton))

  await wait(() => expect(submitSignup).toHaveBeenCalledTimes(1))
  await wait(() => expect(submitSignup).toBe(expectedValue))
})
