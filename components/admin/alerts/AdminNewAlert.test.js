import * as React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewAlert } from './AdminNewAlert'
import ADD_ALERT from '../../../graphql/queries/addAlert'
import * as Sentry from '@sentry/browser'
jest.mock('@sentry/browser')
const addAlertMock = {
  request: {
    query: ADD_ALERT,
    variables: {
      text: 'New alert',
      type: 'info',
      url: 'url',
      urlCaption: 'caption'
    }
  },
  result: {
    data: {
      addAlert: [
        {
          id: '1',
          test: 'New alert',
          type: 'info',
          url: 'url',
          urlCaption: 'caption'
        }
      ]
    }
  }
}

describe('AdminLewAlert component', () => {
  test('Should create new alert', async () => {
    const { container } = render(
      <MockedProvider mocks={[addAlertMock]} addTypename={false}>
        <NewAlert setAlerts={() => {}} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    await userEvent.type(screen.getByTestId('input0'), 'New alert', {
      delay: 1
    })
    await userEvent.type(screen.getByTestId('input2'), 'url', { delay: 1 })
    await userEvent.type(screen.getByTestId('input3'), 'caption', { delay: 1 })
    await userEvent.click(screen.getByText('Create New Alert'))
    await waitFor(() => expect(screen.getByTestId('input0').value).toEqual(''))
    await waitFor(() => expect(screen.getByTestId('input2').value).toEqual(''))
    await waitFor(() => expect(screen.getByTestId('input3').value).toEqual(''))
  })
  test('Should capture error', async () => {
    const errorAlertMock = { ...addAlertMock, error: new Error('fail') }
    delete errorAlertMock.result
    render(
      <MockedProvider mocks={[errorAlertMock]} addTypename={false}>
        <NewAlert setAlerts={() => {}} />
      </MockedProvider>
    )
    await userEvent.type(screen.getByTestId('input0'), 'New alert', {
      delay: 1
    })
    await userEvent.type(screen.getByTestId('input2'), 'url', { delay: 1 })
    await userEvent.type(screen.getByTestId('input3'), 'caption', { delay: 1 })
    await userEvent.click(screen.getByText('Create New Alert'))
    await waitFor(() => expect(Sentry.captureException).toBeCalled())
  })
  test('Should refuse creating new alert with incomplete data', async () => {
    const { container } = render(
      <MockedProvider mocks={[addAlertMock]} addTypename={false}>
        <NewAlert setAlerts={() => {}} />
      </MockedProvider>
    )
    await userEvent.type(screen.getByTestId('input2'), 'url', { delay: 1 })
    await userEvent.type(screen.getByTestId('input3'), 'caption', { delay: 1 })
    await userEvent.click(screen.getByText('Create New Alert'))
    await waitFor(() => expect(screen.getByText('Required')).toBeTruthy())
    expect(container).toMatchSnapshot()
  })
})
