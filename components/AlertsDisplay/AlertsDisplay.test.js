import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import AlertsDisplay from './AlertsDisplay'

describe('Alerts Display Component', () => {
  const alerts = [
    {
      id: '0',
      text: 'Please upgrade your CLI client by running npm update c0d3.',
      type: 'urgent'
    },
    {
      id: '1',
      text: 'Set up your computer to submit challenges.',
      type: 'info',
      url: 'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
      urlCaption: 'View Instructions'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('Should render properly when no props are passed in', () => {
    const { container } = render(<AlertsDisplay />)

    expect(container).toMatchSnapshot()
  })

  test('Should dismiss alerts based on local storage', () => {
    jest
      .spyOn(window.Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ 1: true }))

    const { getAllByRole } = render(
      <AlertsDisplay alerts={alerts} page="curriculum" />
    )

    const displayedAlerts = getAllByRole('button')
    expect(displayedAlerts.length).toEqual(1)
  })

  test('Should dismiss alert for curriculum page', () => {
    jest.spyOn(window.Storage.prototype, 'getItem').mockReturnValueOnce(null)

    const { getAllByRole } = render(
      <AlertsDisplay alerts={alerts} page="curriculum" />
    )
    let displayedAlerts = getAllByRole('button')
    expect(displayedAlerts.length).toEqual(2)
    const firstDismiss = getAllByRole('button')[0]
    act(() => {
      fireEvent.click(firstDismiss)
    })
    displayedAlerts = getAllByRole('button')
    expect(displayedAlerts.length).toEqual(1)
  })
})
