import React from 'react'
import LessonTitleCard from './LessonTitleCard'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
describe('LessonTitleCard component', () => {
  const setShow = jest.fn()
  const props = {
    lessonCoverUrl: 'coverUrl',
    lessonUrl: 'lessonUrl',
    lessonTitle: 'Test Lesson',
    lessonId: '0',
    isPassed: true,
    setShow,
    show: false
  }
  test('Should show challenges on click on mobile devices', async () => {
    global.window.innerWidth = 500
    const { container } = render(<LessonTitleCard {...props} />)
    await waitFor(() => fireEvent.click(screen.getByText('CHALLENGES')))
    expect(setShow).toBeCalledWith(true)
    expect(container).toMatchSnapshot()
  })
  test('Should render default layout for wider screens', async () => {
    global.window.innerWidth = 1080
    const { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
