import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Image from './ModalImage'
import userEvent from '@testing-library/user-event'

describe('Image component test', () => {
  test('Should render image', () => {
    const container = render(
      <Image src="/assets/curriculum/js-0-cover.svg" alt="test" />
    )
    userEvent.click(screen.getByAltText('test'))
    expect(container).toMatchSnapshot()
    userEvent.click(screen.getAllByAltText('test')[1])
  })
})
