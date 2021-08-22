import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import NextPreviousLessons from './NextPreviousLessons'

describe('NextPreviousLessons component', () => {
  const subLessons = [
    {
      frontMatter: { title: 'first lesson', order: 0 },
      sublesson_slug: 'first_lesson'
    },
    {
      frontMatter: { title: 'second lesson', order: 1 },
      sublesson_slug: 'second_lesson'
    },
    {
      frontMatter: { title: 'third lesson', order: 2 },
      sublesson_slug: 'third_lesson'
    },
    {
      frontMatter: { title: 'fourth lesson', order: 3 },
      sublesson_slug: 'fourth_lesson'
    }
  ]
  test('should not render previous link on first sublesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        sublesson_slug={'first_lesson'}
        lesson_slug={'js0'}
      />
    )

    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /next/i })).toBeInTheDocument()
  })
  test('should render previous and next links on a middle sublesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        sublesson_slug={'second_lesson'}
        lesson_slug={'js0'}
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
        sublesson_slug={'second_lesson'}
        lesson_slug={'js0'}
      />
    )
    const previous = screen.queryByRole('link', { name: /previous/i })
    expect(previous).toBeInTheDocument()
    expect(previous).toHaveAttribute(
      'href',
      `/curriculum/js0/${subLessons[0].sublesson_slug}`
    )
    const next = screen.queryByRole('link', { name: /next/i })
    expect(next).toBeInTheDocument()
    expect(next).toHaveAttribute(
      'href',
      `/curriculum/js0/${subLessons[2].sublesson_slug}`
    )
  })

  test('should not render next link on last sublesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons}
        sublesson_slug={'fourth_lesson'}
        lesson_slug={'js0'}
      />
    )

    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /next/i })
    ).not.toBeInTheDocument()
  })
  test('should not render next or previous links if there is only one sublesson', () => {
    render(
      <NextPreviousLessons
        subLessons={subLessons.slice(0, 1)}
        sublesson_slug={'first_lesson'}
        lesson_slug={'js0'}
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
