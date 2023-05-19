import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import LessonTitleCard from '../LessonTitleCard'

import { LayoutGetter } from '../../@types/page'
import { Lesson, useGetSessionQuery } from '../../graphql'

type Props = {
  lesson: Lesson
}
const LessonLayout: React.FC<Props> = ({ children, lesson }) => {
  const [isPassed, setIsPassed] = useState(false)
  const { data: { session } = {} } = useGetSessionQuery({ ssr: false })
  useEffect(() => {
    if (!session) {
      setIsPassed(false)
      return
    }
    const newState = Boolean(
      session.lessonStatus?.find(l => l.lessonId === lesson.id)?.passedAt
    )

    setIsPassed(newState)
  }, [session, lesson.id])
  return (
    <div className="row mt-4">
      <LessonTitleCard
        lessonCoverUrl={`js-${lesson.order}-cover.svg`}
        lessonUrl={lesson.docUrl}
        lessonTitle={lesson.title}
        lessonId={lesson.id}
        lessonSlug={lesson.slug}
        isPassed={isPassed}
      />
      {children}
    </div>
  )
}

export const getLayout: LayoutGetter<Props> = (page, { lesson }) => {
  return (
    <Layout>
      {/* TODO: Add fallback page title */}
      <LessonLayout lesson={lesson}>{page}</LessonLayout>
    </Layout>
  )
}

export default LessonLayout
