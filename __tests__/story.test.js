import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  TextInput,
  EmailInput,
  PasswordInput
} from '../stories/components/Input.stories'

describe('Input stories', () => {
  test('Should display Error message on TextInput', async () => {
    const { getByText } = render(<TextInput />)
    const submitBtn = getByText('Submit')
    await waitFor(() => fireEvent.click(submitBtn))
    expect(getByText('Error message'))
  })

  test('Should display Error message on EmailInput', async () => {
    const { getByText } = render(<EmailInput />)
    const submitBtn = getByText('Submit')
    await waitFor(() => fireEvent.click(submitBtn))
    expect(getByText('Error message'))
  })

  test('Should display Error message on PasswordInput', async () => {
    const { getByText } = render(<PasswordInput />)
    const submitBtn = getByText('Submit')
    await waitFor(() => fireEvent.click(submitBtn))
    expect(getByText('Error message'))
  })
})
