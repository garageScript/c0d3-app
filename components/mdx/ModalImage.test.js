import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Image from './ModalImage'
import userEvent from '@testing-library/user-event'

describe('Image component test', () => {
  test('Should render image', async () => {
    render(
      <Image
        width={313}
        height={360}
        src="/assets/landing/header-01.svg"
        data-testid="modal-image"
      />
    )
    expect(screen.getByTestId('modal-image')).not.toBeVisible()
    userEvent.click(screen.getByRole('presentation', { hidden: true }))
    await waitFor(() => expect(screen.getByTestId('modal-image')).toBeVisible())
    userEvent.click(screen.getByTestId('modal-image'))
  })
})
