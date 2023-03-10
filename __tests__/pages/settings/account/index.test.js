jest.mock('@sentry/browser')

import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountSettings from '../../../../pages/settings/account/index'
import { MockedProvider } from '@apollo/client/testing'
import USER_INFO from '../../../../graphql/queries/userInfo'
import UPDATE_USER_NAMES from '../../../../graphql/queries/updateUserNames'
import UPDATE_USER_PASSWORD from '../../../../graphql/queries/updateUserPassword'
import dummyLessonData from '../../../../__dummy__/lessonData'
import dummySessionData from '../../../../__dummy__/sessionData'
import dummyStarsData from '../../../../__dummy__/starsData'
import { SessionContext, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import * as Sentry from '@sentry/browser'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'
import { UNLINK_DISCORD } from '../../../../graphql/queries/unlinkDiscord'

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

const unlinkDiscordMock = {
  request: {
    query: UNLINK_DISCORD
  },
  result: jest.fn(() => ({
    data: {
      unlinkDiscord: {
        id: 1
      }
    }
  }))
}

const unlinkDiscordMockWithError = {
  request: {
    query: UNLINK_DISCORD
  },
  newData: jest.fn(() => {
    throw new Error('Error')
  })
}

const session = {
  ...dummySessionData,
  lessonStatus: [
    {
      id: 1,
      userId: '1',
      lessonId: 5,
      passedAt: `'true'`,
      starGiven: null,
      starsReceived: [dummyStarsData[0]]
    },
    {
      id: 2,
      userId: '1',
      lessonId: 2,
      passedAt: Date.now().toString(),
      starGiven: null,
      starsReceived: [dummyStarsData[1]]
    },
    {
      id: 3,
      userId: '1',
      lessonId: 1,
      passedAt: Date.now().toString(),
      starGiven: null,
      starsReceived: [dummyStarsData[2], dummyStarsData[9]]
    }
  ]
}

const UserInfoMock = {
  request: {
    query: USER_INFO,
    variables: {
      username: 'fakeusername'
    }
  },
  result: {
    data: {
      lessons: dummyLessonData,
      userInfo: session
    }
  }
}

const mocks = [
  unlinkDiscordMock,
  UserInfoMock,
  UpdateUserNamesMock,
  UpdateUserPasswordMock
]

const mocksWithDiscordData = [
  unlinkDiscordMock,
  {
    ...UserInfoMock,
    result: {
      ...UserInfoMock.result,
      data: {
        ...UserInfoMock.result.data,
        userInfo: {
          ...session,
          user: { ...session.user, discordUsername: 'floppityflob' }
        }
      }
    }
  },
  UpdateUserNamesMock,
  UpdateUserPasswordMock
]

const mocksWithError = [
  unlinkDiscordMockWithError,
  {
    ...UserInfoMock,
    result: {
      ...UserInfoMock.result,
      data: {
        ...UserInfoMock.result.data,
        userInfo: {
          ...session,
          user: { ...session.user, name: null, discordUsername: 'floppityflob' }
        }
      }
    }
  },
  UpdateUserNamesMockWithError
]

const updateUserPasswordMocksWithError = [
  unlinkDiscordMock,
  UserInfoMock,
  UpdateUserPasswordMockWithError
]

const basicQueryInfoMessages = {
  data: 'Updated your names successfully!'
}

const passwordQueryInfoMessages = {
  data: 'Updated your password successfully!'
}

describe('Account settings page', () => {
  const { push } = useRouter()

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

  it('Should redirect to /login if session status is unauthenticated', async () => {
    expect.assertions(1)

    useSession.mockReturnValueOnce({ status: 'unauthenticated', data: null })

    render(
      <MockedProvider mocks={mocks}>
        <AccountSettings />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    expect(push).toBeCalledWith({
      pathname: '/login',
      query: { next: expect.any(String) }
    })
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

  describe('Password setting', () => {
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

  describe('Linked account setting', () => {
    it('Should start linking Discord flow', async () => {
      expect.assertions(1)

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AccountSettings />
        </MockedProvider>
      )

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

      const connectBtn = await screen.findByTestId('connect-to-discord')

      await userEvent.click(connectBtn)

      expect(signIn).toBeCalled()
    })

    it('Should start unlinking Discord flow', async () => {
      expect.assertions(1)

      render(
        <MockedProvider mocks={mocksWithDiscordData} addTypename={false}>
          <AccountSettings />
        </MockedProvider>
      )

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

      const unlinkButton = await screen.findByTestId('unlink-discord')

      await userEvent.click(unlinkButton)

      expect(unlinkDiscordMock.result).toBeCalled()
    })

    it('Should capture exception when unlinking Discord', async () => {
      expect.assertions(1)

      render(
        <MockedProvider mocks={mocksWithError} addTypename={false}>
          <AccountSettings />
        </MockedProvider>
      )

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

      const unlinkButton = await screen.findByTestId('unlink-discord')

      await userEvent.click(unlinkButton)

      expect(Sentry.captureException).toBeCalled()
    })

    it('Should not call userInfo query if session username is missing', async () => {
      expect.assertions(1)

      useSession.mockReturnValue({
        status: 'unauthenticated'
      })

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AccountSettings />
        </MockedProvider>
      )

      expect(await screen.findByText('Loading...')).toBeInTheDocument()
    })
  })
})
