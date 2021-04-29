import React from 'react'
import LessonTitleCard from './LessonTitleCard'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
describe('LessonTitleCard component on Curriculum Page', () => {
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
    await waitFor(() => fireEvent.click(screen.getByText('SHOW CHALLENGES')))
    expect(setShow).toBeCalledWith(true)
    expect(container).toMatchSnapshot()
  })
  test('Should render default layout for wider screens', async () => {
    global.window.innerWidth = 1080
    const { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})

describe('LessonTitleCard component on Review Page', () => {
  const props = {
    lessonCoverUrl: 'coverUrl',
    lessonUrl: 'lessonUrl',
    lessonTitle: 'Test Lesson',
    lessonId: '0',
    isPassed: true
  }

  test('Should render default layout for all screens', async () => {
    global.window.innerWidth = 1080
    let { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()

    global.window.innerWidth = 500
    ;({ container } = render(<LessonTitleCard {...props} />))
    expect(container).toMatchSnapshot()
  })
})
