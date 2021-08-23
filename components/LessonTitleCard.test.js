import React from 'react'
import LessonTitleCard from './LessonTitleCard'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

describe('LessonTitleCard Component', () => {
  const setShow = jest.fn()
  const props = {
    lessonCoverUrl: 'coverUrl',
    lessonUrl: 'lessonUrl',
    lessonTitle: 'Test Lesson',
    lessonId: '0',
    lessonSlug: 'js0',
    isPassed: true
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Go back should call router.back()', async () => {
    const { back } = useRouter()
    const { container } = render(<LessonTitleCard {...props} />)
    expect(back).not.toHaveBeenCalled()
    userEvent.click(screen.getByText('Go Back'))
    expect(back).toHaveBeenCalled()
  })

  test('should display "show challenges" button on small screens and call "setShow" when clicked', async () => {
    global.window.innerWidth = 500
    const { container } = render(
      <LessonTitleCard {...props} setShow={setShow} show={false} />
    )
    userEvent.click(screen.getByText('SHOW CHALLENGES'))
    expect(setShow).toBeCalledWith(true)
    expect(container).toMatchSnapshot()
  })

  test('should display "challenges" button on wider screens', async () => {
    global.window.innerWidth = 1080
    const { container } = render(
      <LessonTitleCard {...props} setShow={setShow} show={false} />
    )
    expect(container).toMatchSnapshot()
  })

  test('Renders default layout', async () => {
    let { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
