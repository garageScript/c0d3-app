import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import NextPreviousLessons from './NextPreviousLessons'

describe('NextPreviousLessons component', () => {
  const subLessons = [
    {
      frontMatter: { title: 'first lesson', order: 0 },
      subLessonSlug: 'first_lesson'
    },
    {
      frontMatter: { title: 'second lesson', order: 1 },
      subLessonSlug: 'second_lesson'
    },
    {
      frontMatter: { title: 'third lesson', order: 2 },
      subLessonSlug: 'third_lesson'
    },
    {
      frontMatter: { title: 'fourth lesson', order: 3 },
      subLessonSlug: 'fourth_lesson'
    }
  ]
  test('should not render previous link on first subLesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        subLessonSlug={'first_lesson'}
        lessonSlug={'js0'}
      />
    )

    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /next/i })).toBeInTheDocument()
  })
  test('should render previous and next links on a middle subLesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        subLessonSlug={'second_lesson'}
        lessonSlug={'js0'}
      />
    )

    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /next/i })).toBeInTheDocument()
  })
  test('should render links with correct href', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        subLessonSlug={'second_lesson'}
        lessonSlug={'js0'}
      />
    )
    const previous = screen.queryByRole('link', { name: /previous/i })
    expect(previous).toBeInTheDocument()
    expect(previous).toHaveAttribute(
      'href',
      `/curriculum/js0/${subLessons[0].subLessonSlug}`
    )
    const next = screen.queryByRole('link', { name: /next/i })
    expect(next).toBeInTheDocument()
    expect(next).toHaveAttribute(
      'href',
      `/curriculum/js0/${subLessons[2].subLessonSlug}`
    )
  })

  test('should not render next link on last subLesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        subLessonSlug={'fourth_lesson'}
        lessonSlug={'js0'}
      />
    )

    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /next/i })
    ).not.toBeInTheDocument()
  })
  test('should not render next or previous links if there is only one subLesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons.slice(0, 1)}
        subLessonSlug={'first_lesson'}
        lessonSlug={'js0'}
      />
    )

    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /next/i })
    ).not.toBeInTheDocument()
  })
})
