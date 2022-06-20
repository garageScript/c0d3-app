import React from 'react'
import AdminLessonCard from '../../components/admin/lessons/AdminLessonCard'

export default {
  title: 'Components/AdminLessonCard',
  component: AdminLessonCard
}

const props = {
  lesson: {
    title: 'Foundations of Javascript',
    description: 'A super simple introduction to help you get started!',
    challenges: [],
    id: 0,
    order: 0,
    slug: 'js0'
  },

  pendingFlaggedQuestions: 3
}

export const Basic = () => {
  return <AdminLessonCard {...props} />
}
