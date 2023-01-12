jest.mock('@sentry/browser')

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountSettings from '../../../../pages/settings/account/index'
import { MockedProvider } from '@apollo/client/testing'
import GetApp from '../../../../graphql/queries/getApp.ts'
import UPDATE_USER_NAMES from '../../../../graphql/queries/updateUserNames'
import UPDATE_USER_PASSWORD from '../../../../graphql/queries/updateUserPassword'
import dummyLessonData from '../../../../__dummy__/lessonData'
import dummySessionData from '../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../__dummy__/alertData'
import * as Sentry from '@sentry/browser'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const UpdateUserNamesMock = {
  request: {
    query: UPDATE_USER_NAMES,
    variables: {
      username: 'taco',
      name: 'ta co'
    }
  },
  result: {
    data: {
      updateUserNames: {
        id: 1,
        username: 'taco',
        name: 'ta co'
      }
    }
  },
  newData: jest.fn(() => ({
    data: {
      updateUserNames: {
        id: 1,
        username: 'taco',
        name: 'ta co'
      }
    }
  }))
}

const UpdateUserNamesMockWithError = {
  request: {
    query: UPDATE_USER_NAMES,
    variables: {
      username: 'taco',
      name: 'ta co'
    }
  },
  result: {
    data: {
      updateUserNames: {
        id: 1,
        username: 'taco',
        name: 'ta co'
      }
    }
  },
  newData: jest.fn(() => {
    throw new Error('Error')
  })
}

const UpdateUserPasswordMock = {
  request: {
    query: UPDATE_USER_PASSWORD,
    variables: {
      currentPassword: 'password',
      newPassword: 'drowssap',
      newPasswordAgain: 'drowssap'
    }
  },
  result: {
    data: {
      updateUserPassword: {
        success: true
      }
    }
  },
  newData: jest.fn(() => ({
    data: {
      updateUserPassword: {
        success: true
      }
    }
  }))
}

const UpdateUserPasswordMockWithError = {
  request: {
    query: UPDATE_USER_PASSWORD,
    variables: {
      currentPassword: 'password',
      newPassword: 'drowssap',
      newPasswordAgain: 'drowssap'
    }
  },
  result: {
    data: {
      updateUserPassword: {
        success: true
      }
    }
  },
  newData: jest.fn(() => {
    throw new Error('Error')
  })
}

const mocks = [
  {
    request: { query: GetApp },
    result: {
      data: {
        session: dummySessionData,
        lessons: dummyLessonData,
        alerts: dummyAlertData
      }
    }
  },
  UpdateUserNamesMock,
  UpdateUserPasswordMock
]

const mocksWithError = [
  {
    request: { query: GetApp },
    result: {
      data: {
        session: {
          ...dummySessionData,
          user: { ...dummySessionData.user, name: null }
        },
        lessons: dummyLessonData,
        alerts: dummyAlertData
      }
    }
  },
  UpdateUserNamesMockWithError
]

const updateUserPasswordMocksWithError = [
  {
    request: { query: GetApp },
    result: {
      data: {
        session: dummySessionData,
        lessons: dummyLessonData,
        alerts: dummyAlertData
      }
    }
  },
  UpdateUserPasswordMockWithError
]

const basicQueryInfoMessages = {
  data: 'Updated your names successfully!'
}

const passwordQueryInfoMessages = {
  data: 'Updated your password successfully!'
}

describe('Account settings page', () => {
  const getInputs = index => [
    screen.getAllByTestId('input0')[index],
    screen.getAllByTestId('input1')[index],
    screen.getAllByTestId('input2')[index]
  ]

  // the inputs for the basic and password sections
  // have the same test IDs, that's why here we're
  // getting them by their index
  const getBasicInputs = () => getInputs(0)
  const getBasicInputsBtn = () => screen.getAllByText('Save Changes')[0]

  const getPasswordInputs = () => getInputs(1)
  const getPasswordInputsBtn = () => screen.getAllByText('Save Changes')[1]

  it('Should render the page', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <AccountSettings />
      </MockedProvider>
    )

    expect(await screen.findByText('Settings')).toBeInTheDocument()
  })

  describe('Basic settings', () => {
    it('Should update basics section inputs and submit', async () => {
      expect.assertions(3)

      const inputValues = {
        username: 'taco',
        firstName: 'ta',
        lastName: 'co'
      }

      render(
        <MockedProvider mocks={mocks}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [usernameInput, firstNameInput, lastNameInput] = getBasicInputs()

      await userEvent.type(usernameInput, inputValues.username)
      await userEvent.type(firstNameInput, inputValues.firstName)
      await userEvent.type(lastNameInput, inputValues.lastName)

      const inputsWithNewValues = getBasicInputs()

      expect(inputsWithNewValues[0].value).toEqual(inputValues.username)
      expect(inputsWithNewValues[1].value).toEqual(inputValues.firstName)
      expect(inputsWithNewValues[2].value).toEqual(inputValues.lastName)
    })

    it('Should update user names successfully', async () => {
      expect.assertions(4)

      const inputValues = {
        username: 'taco',
        firstName: 'ta',
        lastName: 'co'
      }

      render(
        <MockedProvider mocks={mocks}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [usernameInput, firstNameInput, lastNameInput] = getBasicInputs()

      await userEvent.type(usernameInput, inputValues.username)
      await userEvent.type(firstNameInput, inputValues.firstName)
      await userEvent.type(lastNameInput, inputValues.lastName)

      await userEvent.click(getBasicInputsBtn())

      expect(UpdateUserNamesMock.newData).toBeCalled()

      // Wait for the alert to appear in the screen
      expect(
        await screen.findByText(basicQueryInfoMessages.data)
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toBeInTheDocument()
      await userEvent.click(screen.getByLabelText('Close alert'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('Should not update user names if one of the inputs are incorrect', async () => {
      expect.assertions(1)

      const inputValues = {
        username: 'taco',
        firstName: 'ta',
        lastName: 'co'
      }

      render(
        <MockedProvider mocks={mocks}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [usernameInput, firstNameInput, lastNameInput] = getBasicInputs()

      await userEvent.type(usernameInput, `${inputValues.username}A`)
      await userEvent.type(firstNameInput, inputValues.firstName)
      await userEvent.type(lastNameInput, inputValues.lastName)

      await userEvent.click(getBasicInputsBtn())

      expect(UpdateUserNamesMock.newData).not.toBeCalled()
    })

    it('Should capture error when mutation fails', async () => {
      expect.assertions(3)

      const inputValues = {
        username: 'taco',
        firstName: 'ta',
        lastName: 'co'
      }

      render(
        <MockedProvider mocks={mocksWithError}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [usernameInput, firstNameInput, lastNameInput] = getBasicInputs()

      await userEvent.type(usernameInput, inputValues.username)
      await userEvent.type(firstNameInput, inputValues.firstName)
      await userEvent.type(lastNameInput, inputValues.lastName)

      await userEvent.click(getBasicInputsBtn())

      expect(Sentry.captureException).toBeCalled()

      expect(screen.getByRole('alert')).toBeInTheDocument()
      await userEvent.click(screen.getByLabelText('Close alert'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('Password settings', () => {
    it('Should update inputs and submit', async () => {
      expect.assertions(3)

      const inputValues = {
        currentPassword: 'password',
        newPassword: 'drowssap',
        newPasswordAgain: 'drowssap'
      }

      render(
        <MockedProvider mocks={mocks}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [currentPassword, newPassword, newPasswordAgain] =
        getPasswordInputs()

      await userEvent.type(currentPassword, inputValues.currentPassword)
      await userEvent.type(newPassword, inputValues.newPassword)
      await userEvent.type(newPasswordAgain, inputValues.newPasswordAgain)

      const inputsWithNewValues = getPasswordInputs()

      expect(inputsWithNewValues[0].value).toEqual(inputValues.currentPassword)
      expect(inputsWithNewValues[1].value).toEqual(inputValues.newPassword)
      expect(inputsWithNewValues[2].value).toEqual(inputValues.newPasswordAgain)
    })

    it('Should update user password successfully', async () => {
      expect.assertions(4)

      const inputValues = {
        currentPassword: 'password',
        newPassword: 'drowssap',
        newPasswordAgain: 'drowssap'
      }

      render(
        <MockedProvider mocks={mocks}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [currentPassword, newPassword, newPasswordAgain] =
        getPasswordInputs()

      await userEvent.type(currentPassword, inputValues.currentPassword)
      await userEvent.type(newPassword, inputValues.newPassword)
      await userEvent.type(newPasswordAgain, inputValues.newPasswordAgain)

      await userEvent.click(getPasswordInputsBtn())

      expect(UpdateUserPasswordMock.newData).toBeCalled()

      // Wait for the alert to appear in the screen
      expect(
        await screen.findByText(passwordQueryInfoMessages.data)
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toBeInTheDocument()
      await userEvent.click(screen.getByLabelText('Close alert'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('Should not update user password if one of the inputs are incorrect', async () => {
      expect.assertions(1)

      render(
        <MockedProvider mocks={mocks}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [currentPassword, newPassword, newPasswordAgain] =
        getPasswordInputs()

      await userEvent.clear(currentPassword)
      await userEvent.clear(newPassword)
      await userEvent.clear(newPasswordAgain)

      await userEvent.click(getPasswordInputsBtn())

      expect(UpdateUserNamesMock.newData).not.toBeCalled()
    })

    it('Should capture error when mutation fails', async () => {
      expect.assertions(3)

      const inputValues = {
        currentPassword: 'password',
        newPassword: 'drowssap',
        newPasswordAgain: 'drowssap'
      }

      render(
        <MockedProvider mocks={updateUserPasswordMocksWithError}>
          <AccountSettings />
        </MockedProvider>
      )

      // Waiting for the query to resolve
      await screen.findByText('Settings')

      const [currentPassword, newPassword, newPasswordAgain] =
        getPasswordInputs()

      await userEvent.type(currentPassword, inputValues.currentPassword)
      await userEvent.type(newPassword, inputValues.newPassword)
      await userEvent.type(newPasswordAgain, inputValues.newPasswordAgain)

      await userEvent.click(getPasswordInputsBtn())

      expect(Sentry.captureException).toBeCalled()

      expect(screen.getByRole('alert')).toBeInTheDocument()
      await userEvent.click(screen.getByLabelText('Close alert'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
