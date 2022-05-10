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
  const onClick = (item: { id: number }) => setActive(item.id)

  return (
    <AdminLessonSideNav
      items={items}
      title={'modules'}
      lessonId={1}
      onAddItem={() => {}}
      active={active}
      onClick={onClick}
    />
  )
}

export const Loading = () => {
  const [_, setActive] = useState(0)
  const onClick = (item: { id: number }) => setActive(item.id)

  return (
    <AdminLessonSideNav
      items={undefined}
      title={'modules'}
      lessonId={1}
      onAddItem={() => {}}
      loading={true}
      onClick={onClick}
    />
  )
}

export const Error = () => {
  const [_, setActive] = useState(0)
  const onClick = (item: { id: number }) => setActive(item.id)

  return (
    <AdminLessonSideNav
      items={undefined}
      title={'modules'}
      lessonId={1}
      onAddItem={() => {}}
      error={{} as ApolloError}
      onClick={onClick}
    />
  )
}
