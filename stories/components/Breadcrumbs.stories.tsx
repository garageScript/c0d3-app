import React, { useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { GetAppQuery } from '../../graphql'

export default {
  component: Breadcrumbs,
  title: 'Components/Breadcrumbs'
}

const lessons = [
  { title: 'Foundations of JavaScript' },
  { title: 'Variables' }
] as GetAppQuery['lessons']

const parameters = {
  nextRouter: {
    asPath: 'c0d3.com/admin/lessons'
  }
}

export const Basic = () => {
  const [lessonTitle, setLessonTitle] = useState(lessons[0].title)

  return (
    <Breadcrumbs
      omitHomeRoute={false}
      lessonTitle={lessonTitle}
      setLessonTitle={setLessonTitle}
      lessons={lessons}
      homeTitle="Home"
    />
  )
}

Basic.story = { parameters }

export const WithOmitHomeRoute = () => {
  const [lessonTitle, setLessonTitle] = useState(lessons[0].title)

  return (
    <Breadcrumbs
      omitHomeRoute={true}
      lessonTitle={lessonTitle}
      setLessonTitle={setLessonTitle}
      lessons={lessons}
      homeTitle="Home"
    />
  )
}

WithOmitHomeRoute.story = { parameters }
