import React from 'react'
import { render, screen } from '@testing-library/react'
import Alert from '.'
import userEvent from '@testing-library/user-event'

// Imported to be able to use .toBeInTheDocument()
import '@testing-library/jest-dom'

describe('Alert component', () => {
  it('should hide the alert on dismiss', async () => {
    render(
      <Alert
        alert={{
          id: 0,
          text: 'Set up your computer to submit challenges.',
          type: 'info',
          url: 'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
          urlCaption: 'View Instructions'
        }}
        onDismiss={() => {}}
      />
    )

    await userEvent.click(screen.getByRole('button'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
