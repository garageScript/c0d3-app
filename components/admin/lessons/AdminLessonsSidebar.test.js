import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AdminLessonsSideBar } from './AdminLessonsSideBar'
import dummyLessonData from '../../../__dummy__/lessonData'
describe('AdminLessonSideBar component', () => {
  test('Should render lessons', async () => {
    const { container } = render(
      <AdminLessonsSideBar
        lessons={dummyLessonData}
        selectedLesson={1}
        setLessons={() => {}}
        setSelectedLesson={() => {}}
      />
    )
    expect(container).toMatchSnapshot()
    const lesson = screen.getByRole('tab', { name: 'Arrays' })
    await userEvent.click(lesson)
    expect(container).toMatchSnapshot()
  })
  test('Should render empty lessons', async () => {
    const { container } = render(
      <AdminLessonsSideBar
        selectedLesson={1}
        setLessons={() => {}}
        setSelectedLesson={() => {}}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
