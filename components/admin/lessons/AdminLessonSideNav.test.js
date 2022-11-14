import React from 'react'
import { render, screen } from '@testing-library/react'
import AdminLessonSideNav from './AdminLessonSideNav'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const items = [
  {
    id: 0,
    name: 'First module',
    content: 'A module is more than just a group of exercises, it is-',
    lesson: { id: 1 }
  },
  {
    id: 1,
    name: 'Second module',
    content: 'A module is more than just a group of exercises, it is-',
    lesson: { id: 1 }
  },
  {
    id: 2,
    name: 'Third module',
    content: 'A module is more than just a group of exercises, it is-',
    lesson: { id: 1 }
  },
  {
    id: 3,
    name: 'Fourth module',
    content: 'A module is more than just a group of exercises, it is-',
    lesson: { id: 1 }
  }
]

const filteredItems = items.filter(item => item.lesson.id === 1)

describe('AdminLessonSideNav component', () => {
  it('Should display the items', () => {
    expect.assertions(1)

    render(<AdminLessonSideNav items={items} />)

    expect(screen.getByText('First module')).toBeInTheDocument()
  })

  it('Should display the items with one active item', () => {
    expect.assertions(1)

    render(<AdminLessonSideNav items={filteredItems} selectedIndex={0} />)

    expect(screen.getByText('First module')).toBeInTheDocument()
  })

  it('Should display a message if there is no items', () => {
    expect.assertions(1)

    render(<AdminLessonSideNav items={[]} />)

    expect(screen.getByText('No items in this lesson')).toBeInTheDocument()
  })

  it('Should set active item', async () => {
    expect.assertions(1)

    let active = -1
    const setActive = jest.fn().mockImplementation(x => (active = x))

    render(
      <AdminLessonSideNav
        items={filteredItems}
        selectedIndex={active}
        onSelect={item => setActive(item.id)}
      />
    )

    await userEvent.click(screen.getByText('First module'))

    expect(active).toBe(0)
  })

  it('Should call onAddItem on ADD NEW ITEM button click', async () => {
    expect.assertions(1)

    const onAddItem = jest.fn()

    render(
      <AdminLessonSideNav
        items={filteredItems}
        onAddItem={onAddItem}
        selectedIndex={0}
      />
    )

    await userEvent.click(screen.getByText('ADD NEW ITEM'))

    expect(onAddItem).toBeCalled()
  })
})
