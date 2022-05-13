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

    render(<AdminLessonSideNav title="modules" items={items} />)

    expect(screen.getByText('First module')).toBeInTheDocument()
  })

  it('Should display the items with one active item', () => {
    expect.assertions(1)

    render(
      <AdminLessonSideNav
        title="modules"
        items={filteredItems}
        selectedIndex={0}
      />
    )

    expect(screen.getByText('First module')).toBeInTheDocument()
  })

  it('Should display a message if there is no modules', () => {
    expect.assertions(1)

    render(<AdminLessonSideNav title="modules" items={[]} />)

    expect(screen.getByText('No modules in this lesson')).toBeInTheDocument()
  })

  it('Should set active item', async () => {
    expect.assertions(1)

    let active = -1
    const setActive = jest.fn().mockImplementation(x => (active = x))

    render(
      <AdminLessonSideNav
        title="modules"
        items={filteredItems}
        selectedIndex={active}
        onSelect={item => setActive(item.id)}
      />
    )

    await userEvent.click(screen.getByText('First module'))

    expect(active).toBe(0)
  })

  it('Should call onAddItem on ADD NEW MODULE button click', async () => {
    expect.assertions(1)

    const onAddItem = jest.fn()

    render(
      <AdminLessonSideNav
        title="modules"
        items={filteredItems}
        onAddItem={onAddItem}
        selectedIndex={0}
      />
    )

    await userEvent.click(screen.getByText('ADD NEW MODULE'))

    expect(onAddItem).toBeCalled()
  })
})
