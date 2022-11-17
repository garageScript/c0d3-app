import { useState } from '@storybook/addons'
import React from 'react'
import AdminLessonSideNav from '../../components/admin/lessons/AdminLessonSideNav'

export default {
  title: 'Components/AdminLessonSideNav',
  component: AdminLessonSideNav
}

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

export const Basic = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const onSelect = (item: { id: number }) => setSelectedIndex(item.id)

  return (
    <AdminLessonSideNav
      items={items}
      onAddItem={() => {}}
      selectedIndex={selectedIndex}
      onSelect={onSelect}
      itemName="module"
    />
  )
}
