import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditPage from './EditPage'

describe('EditPage Component', () => {
  test('Should display "Edit this page" link and have accessible description', () => {
    render(<EditPage filePath="any/File/Path" />)

    expect(screen.getByRole('link')).toHaveTextContent('Edit this page')
    expect(screen.getByRole('link')).toHaveAccessibleDescription()
  })
  test('link should include c0d3-app github repo root and filePath', () => {
    render(<EditPage filePath="the/filePath" />)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/garageScript/c0d3-app/edit/master/the/filePath'
    )
  })
})
