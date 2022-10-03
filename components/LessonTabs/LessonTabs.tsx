import React from 'react'
import { CURRICULUM_URL } from '../../constants'
import NavCard from '../NavCard'

type Lesson = {
  title: string
  docUrl?: string | null
  slug: string
}

const LessonTabs = ({
  lesson,
  activeTab
}: {
  lesson: Lesson
  activeTab: string
}) => {
  const tabs = [
    ...(lesson.docUrl ? [{ text: 'lesson', url: lesson.docUrl }] : []),
    { text: 'challenges', url: `/curriculum/${lesson.slug}` },
    { text: 'exercises', url: `/exercises/${lesson.slug}` },
    {
      text: 'mentor exercises',
      url: `${CURRICULUM_URL}/${lesson.slug}/mentor`
    }
  ]

  return (
    <NavCard
      tabSelected={tabs.findIndex(tab => tab.text === activeTab)}
      tabs={tabs}
    />
  )
}

export default LessonTabs
