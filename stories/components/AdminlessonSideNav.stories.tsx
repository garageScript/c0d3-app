import { ApolloError } from '@apollo/client'
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
  const [active, setActive] = useState(0)

  return (
    <AdminLessonSideNav
      items={items}
      title={'modules'}
      lessonId={1}
      onAddItem={() => {}}
      active={active}
      setActive={setActive}
    />
  )
}

export const Loading = () => (
  <AdminLessonSideNav
    items={undefined}
    title={'modules'}
    lessonId={1}
    onAddItem={() => {}}
    loading={true}
  />
)

export const Error = () => (
  <AdminLessonSideNav
    items={undefined}
    title={'modules'}
    lessonId={1}
    onAddItem={() => {}}
    error={{} as ApolloError}
  />
)
