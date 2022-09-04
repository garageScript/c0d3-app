import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Exercises from '../../../pages/exercises/[lessonSlug]'

describe('Exercises page', () => {
  test('Should render correctly', async () => {
    const { getByRole } = render(<Exercises />)

    await waitFor(() =>
      getByRole('heading', { name: /Foundations of JavaScript/i })
    )
  })
})
