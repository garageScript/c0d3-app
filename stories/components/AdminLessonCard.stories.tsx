import React from 'react'
import AdminLessonCard from '../../components/admin/lessons/AdminLessonCard'

export default {
  title: 'Components/AdminLessonCard',
  component: AdminLessonCard
}

const props = {
  heading: 'Foundations of Javascript',
  description: 'A super simple introduction to help you get started!',
  pendingFlaggedQuestions: 3,
  width: '35%',
  editLessonUrl: '_blank'
}

export const Basic = () => {
  return (
    <AdminLessonCard
      heading={props.heading}
      description={props.description}
      pendingFlaggedQuestions={props.pendingFlaggedQuestions}
      width={props.width}
      editLessonUrl={props.editLessonUrl}
    />
  )
}
