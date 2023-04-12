import React from 'react'
import { render } from '@testing-library/react'
import Title from './Title'

jest.mock('next/head', () => {
  return ({ children }) => children
})

describe('Title Component', () => {
  test('should render title', async () => {
    const { container } = render(<Title title="test" />, {
      container: document.head
    })
    expect(document.title).toEqual('test — C0D3')
  })
  test('should render default title', async () => {
    const { container } = render(<Title />, {
      container: document.head
    })
    expect(document.title).toEqual('C0D3')
  })
})
