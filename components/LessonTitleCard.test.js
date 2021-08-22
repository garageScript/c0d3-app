import React from 'react'
import LessonTitleCard from './LessonTitleCard'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom'
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

  test('should call router.back() when clicking "go back"', async () => {
    const { back } = useRouter()
    const { container } = render(<LessonTitleCard {...props} />)
    expect(back).not.toHaveBeenCalled()
    userEvent.click(screen.getByText('Go Back'))
    expect(back).toHaveBeenCalled()
  })
  test('should not render lesson button if lessonUrl is undefined', () => {
    const noLessonUrl = { ...props, lessonUrl: undefined }

    render(<LessonTitleCard {...noLessonUrl} />)

    expect(
      screen.queryByRole('link', { name: /lesson/i })
    ).not.toBeInTheDocument()
  })

  test('should display "show challenges" button on small screens and call "setShow" when clicked', () => {
    global.window.innerWidth = 500
    const { container } = render(
      <LessonTitleCard {...props} setShow={setShow} show={false} />
    )

    userEvent.click(screen.getByText('SHOW CHALLENGES'))
    expect(setShow).toBeCalledWith(true)
    expect(container).toMatchSnapshot()
  })

  test('should display "challenges" button on wider screens', () => {
    global.window.innerWidth = 1080
    const { container } = render(
      <LessonTitleCard {...props} setShow={setShow} show={false} />
    )
    expect(container).toMatchSnapshot()
  })

  test('should renders default layout', () => {
    let { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
