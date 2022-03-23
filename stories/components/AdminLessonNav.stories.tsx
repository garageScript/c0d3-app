import * as React from 'react'
import AdminLessonNav from '../../components/admin/lessons/AdminLessonNav'

export default {
  component: AdminLessonNav,
  title: 'Components/AdminLessonNav'
}

const fn = (text: string) => () => <p>{text}</p>

export const Basic: React.FC = () => {
  return (
    <AdminLessonNav
      navItems={[
        {
          value: 'introduction',
          children: ['First', 'Second', 'Third', 'divider', 'fourth']
        },
        {
          value: 'modules'
        }
      ]}
      tabs={[
        () => (
          <>
            <h1>Some text</h1>
            <p>Some paragraph that makes sense</p>
            <small>Small text for the vibes</small>
          </>
        ),
        fn('Modules with delete and add')
      ]}
    />
  )
}
