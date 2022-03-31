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
      panels={[
        {
          tabName: 'introduction',
          tabComponent: () => (
            <>
              <h1>Some text</h1>
              <p>Some paragraph that makes sense</p>
              <small>Small text for the vibes</small>
            </>
          )
        },
        {
          tabName: 'modules',
          tabComponent: fn('Modules with delete and add')
        }
      ]}
    />
  )
}

export const WithManyItems: React.FC = () => {
  return (
    <AdminLessonNav
      panels={[
        {
          tabName: 'introduction',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Zaziuz',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Vanvied',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Bovsoaca',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Evesific',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Tehocon',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Malujo',
          tabComponent: fn('Modules with delete and add')
        },
        {
          tabName: 'Vicolki',
          tabComponent: fn('Modules with delete and add')
        }
      ]}
    />
  )
}
