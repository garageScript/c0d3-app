import React from 'react'
import LessonTitleCard from './LessonTitleCard'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'

describe('LessonTitleCard Component', () => {
  const props = {
    lessonCoverUrl: 'coverUrl',
    lessonUrl: 'lessonUrl',
    lessonTitle: 'Test Lesson',
    lessonId: '0',
    isPassed: true
  }

  test('Go back should call router.back()', async () => {
    const { back } = useRouter()
    const { container } = render(<LessonTitleCard {...props} />)
    await waitFor(() => fireEvent.click(screen.getByText('Go Back')))
    expect(back).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})

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

  test('Renders default layout', async () => {
    let { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
