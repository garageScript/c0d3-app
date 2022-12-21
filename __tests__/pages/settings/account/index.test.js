import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountSettings from '../../../../pages/settings/account/index'
import { MockedProvider } from '@apollo/client/testing'
import GetApp from '../../../../graphql/queries/getApp.ts'
import dummyLessonData from '../../../../__dummy__/lessonData'
import dummySessionData from '../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../__dummy__/alertData'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

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
  }
]

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

    // Will be covered in a different test
    await userEvent.click(screen.getByText('Save Changes'))

    expect(inputsWithNewValues[0].value).toEqual(inputValues.username)
    expect(inputsWithNewValues[1].value).toEqual(inputValues.firstName)
    expect(inputsWithNewValues[2].value).toEqual(inputValues.lastName)
  })
})
