import { mockUseBreakpoint } from '../__mocks__/useBreakpoint.mock'
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
    render(<LessonTitleCard {...props} />)
    expect(back).not.toHaveBeenCalled()
    await userEvent.click(screen.getByText('Go Back'))
    expect(back).toHaveBeenCalled()
  })
  test('should not render lesson button if lessonUrl is undefined', () => {
    const noLessonUrl = { ...props, lessonUrl: undefined }

    render(<LessonTitleCard {...noLessonUrl} />)

    expect(
      screen.queryByRole('link', { name: /lesson/i })
    ).not.toBeInTheDocument()
  })

  test('should display "show challenges" button on small screens and call "setShow" when clicked', async () => {
    mockUseBreakpoint.mockReturnValue(true)
    const { container } = render(
      <LessonTitleCard {...props} setShow={setShow} show={false} />
    )
    expect(mockUseBreakpoint).toBeCalledWith('sm', 'down')
    await userEvent.click(screen.getByText('SHOW CHALLENGES'))
    expect(setShow).toBeCalledWith(true)
    expect(container).toMatchSnapshot()
  })

  test('should display "challenges" button on wider screens', () => {
    mockUseBreakpoint.mockReturnValue(false)
    const { container } = render(
      <LessonTitleCard {...props} setShow={setShow} show={false} />
    )
    expect(mockUseBreakpoint).toBeCalledWith('sm', 'down')
    expect(container).toMatchSnapshot()
  })

  test('should renders default layout', () => {
    let { container } = render(<LessonTitleCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
