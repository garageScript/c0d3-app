import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { SideBar } from './SideBar'

const moduleData = [
  {
    id: 10,
    name: 'Math',
    content: 'Cool'
  },
  {
    id: 11,
    name: 'English',
    content: 'Bad'
  },
  {
    id: 12,
    name: 'Math II',
    content: 'How '
  }
]

describe('AdminLessonSideBar component', () => {
  test('Should render lessons', async () => {
    render(<SideBar modules={moduleData} selectedModule={1} />)
    render(<SideBar selectedModule={1} />)
    screen.getByRole('tab', { name: 'Math II' })
  })
})
