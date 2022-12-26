jest.mock('@sentry/browser')

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountSettings from '../../../../pages/settings/account/index'
import { MockedProvider } from '@apollo/client/testing'
import GetApp from '../../../../graphql/queries/getApp.ts'
import UPDATE_USER_NAMES from '../../../../graphql/queries/updateUserNames'
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
  UpdateUserNamesMock
]

const mocksWithError = [
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
  UpdateUserNamesMockWithError
]

const queryInfoMessages = {
  data: `Updated your names successfully!`
}

describe('Account settings page', () => {
  it('Should render the page', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <AccountSettings />
      </MockedProvider>
    )

    expect(await screen.findByText('Settings')).toBeInTheDocument()
  })

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

    const getInputs = () => [
      screen.getByTestId('input0'),
      screen.getByTestId('input1'),
      screen.getByTestId('input2')
    ]

    const [usernameInput, firstNameInput, lastNameInput] = getInputs()

    await userEvent.type(usernameInput, inputValues.username)
    await userEvent.type(firstNameInput, inputValues.firstName)
    await userEvent.type(lastNameInput, inputValues.lastName)

    const inputsWithNewValues = getInputs()

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

    const getInputs = () => [
      screen.getByTestId('input0'),
      screen.getByTestId('input1'),
      screen.getByTestId('input2')
    ]

    const [usernameInput, firstNameInput, lastNameInput] = getInputs()

    await userEvent.type(usernameInput, inputValues.username)
    await userEvent.type(firstNameInput, inputValues.firstName)
    await userEvent.type(lastNameInput, inputValues.lastName)

    await userEvent.click(screen.getByText('Save Changes'))

    expect(UpdateUserNamesMock.newData).toBeCalled()

    // Wait for the alert to appear in the screen
    expect(await screen.findByText(queryInfoMessages.data)).toBeInTheDocument()

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

    const getInputs = () => [
      screen.getByTestId('input0'),
      screen.getByTestId('input1'),
      screen.getByTestId('input2')
    ]

    const [usernameInput, firstNameInput, lastNameInput] = getInputs()

    await userEvent.type(usernameInput, inputValues.username + 'A')
    await userEvent.type(firstNameInput, inputValues.firstName)
    await userEvent.type(lastNameInput, inputValues.lastName)

    await userEvent.click(screen.getByText('Save Changes'))

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

    const getInputs = () => [
      screen.getByTestId('input0'),
      screen.getByTestId('input1'),
      screen.getByTestId('input2')
    ]

    const [usernameInput, firstNameInput, lastNameInput] = getInputs()

    await userEvent.type(usernameInput, inputValues.username)
    await userEvent.type(firstNameInput, inputValues.firstName)
    await userEvent.type(lastNameInput, inputValues.lastName)

    await userEvent.click(screen.getByText('Save Changes'))

    expect(Sentry.captureException).toBeCalled()

    expect(screen.getByRole('alert')).toBeInTheDocument()
    await userEvent.click(screen.getByLabelText('Close alert'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
