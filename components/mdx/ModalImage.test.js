import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Image from './ModalImage'
import userEvent from '@testing-library/user-event'

describe('Image component test', () => {
  test('Modal should open and close when clicking', async () => {
    // baseElement is needed because modal is rendered outside the container element
    const { getByTestId, baseElement } = render(
      <Image
        width={313}
        height={360}
        src="/assets/landing/header-01.svg"
        data-testid="modal-image"
      />
    )
    // clicking on image, should open modal
    userEvent.click(getByTestId('modal-image'))
    const hidden = baseElement.querySelector('.modal-body > img')
    await waitFor(() => expect(hidden).toBeVisible())

    // clicking modal should close it
    userEvent.click(hidden)
    await waitFor(() => expect(hidden).not.toBeInTheDocument())
  })

  test('Modal should close when pressing ESC', async () => {
    const { getByTestId, baseElement } = render(
      <Image
        width={313}
        height={360}
        src="/assets/landing/header-01.svg"
        data-testid="modal-image"
      />
    )
    userEvent.click(getByTestId('modal-image'))
    const hidden = baseElement.querySelector('.modal-body > img')
    await waitFor(() => expect(hidden).toBeVisible())

    // pressing esc should close it
    userEvent.type(hidden, 'esc')
    await waitFor(() => expect(hidden).not.toBeInTheDocument())
  })
  test('Should add classname according to props', async () => {
    const { getByTestId, baseElement } = render(
      <Image
        width={313}
        height={360}
        src="/assets/landing/header-01.svg"
        data-testid="modal-image"
        tall="true"
      />
    )
    userEvent.click(getByTestId('modal-image'))
    const hidden = baseElement.querySelector('.modal-body > img')
    expect(hidden.className).toEqual('tall')
  })
  test('Should add classname according to props', async () => {
    const { getByTestId, baseElement } = render(
      <Image
        width={313}
        height={360}
        src="/assets/landing/header-01.svg"
        data-testid="modal-image"
        long="true"
      />
    )
    userEvent.click(getByTestId('modal-image'))
    const hidden = baseElement.querySelector('.modal-body > img')
    expect(hidden.className).toEqual('long')
  })
})
