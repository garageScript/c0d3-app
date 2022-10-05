import React from 'react'
import LessonTabs from '../../components/LessonTabs'
import { LessonTab } from '../../components/LessonTabs/LessonTabs'

export default {
  components: LessonTabs,
  title: 'Components/LessonTabs'
}

export const _LessonTabs: React.FC = () => (
  <LessonTabs
    lesson={{
      title: 'Foundations of JavaScript',
      docUrl: '',
      slug: 'js0'
    }}
    activeTab={LessonTab.EXERCISES}
  />
)
