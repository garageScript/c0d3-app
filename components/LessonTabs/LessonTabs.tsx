import React from 'react'
import { CURRICULUM_PATH } from '../../constants'
import NavCard from '../NavCard'

type Lesson = {
  title: string
  docUrl?: string | null
  slug: string
}

export enum LessonTab {
  LESSON = 'lesson',
  CHALLENGES = 'challenges',
  EXERCISES = 'exercises',
  MENTOR_EXERCISES = 'mentor exercises'
}

type Props = {
  lesson: Lesson
  activeTab: LessonTab
}

const LessonTabs = ({ lesson, activeTab }: Props) => {
  const tabs = [
    ...(lesson.docUrl ? [{ text: 'lesson', url: lesson.docUrl }] : []),
    { text: 'challenges', url: `${CURRICULUM_PATH}/${lesson.slug}` },
    { text: 'exercises', url: `/exercises/${lesson.slug}` },
    {
      text: 'mentor exercises',
      url: `${CURRICULUM_PATH}/${lesson.slug}/mentor`
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
