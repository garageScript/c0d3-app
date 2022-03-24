import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import AdminLessonNav from './AdminLessonNav'
import { toUpper } from 'lodash'
import '@testing-library/jest-dom'

const fn = text => () => <p>{text}</p>

const tabs = [
  () => (
    <>
      <h1>Some text</h1>
      <p>Some paragraph that makes sense</p>
      <small>Small text for the vibes</small>
    </>
  ),
  fn('Modules with delete and add')
]

const navItems = [
  {
    value: 'introduction'
  },
  {
    value: 'modules'
  }
]

describe('AdminLessonNav component', () => {
  afterAll(() => jest.clearAllMocks())

  it('Should switch tabs on navItem click', async () => {
    expect.assertions(1)

    const { getByText } = render(
      <AdminLessonNav navItems={navItems} tabs={tabs} />
    )

    const modulesNavItem = getByText(toUpper('modules'))

    fireEvent.click(modulesNavItem)

    const modulesNavItemUpdated = getByText(toUpper('modules'))

    expect(modulesNavItemUpdated).toHaveClass('active')
  })

  it('Should throw error when navItems count is not equal to tabs count', async () => {
    expect.assertions(1)

    // You used to prevent the error from appearing in the console when running tests
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})

    expect(() =>
      render(<AdminLessonNav navItems={navItems} tabs={tabs.slice(0, 1)} />)
    ).toThrowError(
      `navItems and tabs should have the same count. navItems: ${
        navItems.length
      } -- tabs: ${tabs.slice(0, 1).length}`
    )
  })

  it('Should throw error when navItems has duplicate items', async () => {
    expect.assertions(1)

    // You used to prevent the error from appearing in the console when running tests
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})

    expect(() =>
      render(
        <AdminLessonNav
          navItems={[
            {
              value: 'modules'
            },
            {
              value: 'modules'
            }
          ]}
          tabs={tabs}
        />
      )
    ).toThrowError('navItems should have unique items value. No duplicates')
  })
})
