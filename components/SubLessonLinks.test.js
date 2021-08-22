import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import SubLessonLinks from './SubLessonLinks'

describe('SubLessonLinks component', () => {
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
    }
  ]

  test('should render links to all sublessons', () => {
    const lesson_slug = 'js0'
    render(
      <SubLessonLinks
        subLessons={subLessons}
        sublesson_slug={'first_lesson'}
        lesson_slug={lesson_slug}
      />
    )
    subLessons.forEach(cur => {
      const link = screen.getByRole('link', {
        name: new RegExp(cur.frontMatter.title)
      })

      expect(link).toBeInTheDocument
      expect(link).toHaveAttribute(
        'href',
        `/curriculum/${lesson_slug}/${cur.sublesson_slug}`
      )
    })
  })

  test('should render aria-current page on selected sublesson link', () => {
    render(
      <SubLessonLinks
        subLessons={subLessons}
        sublesson_slug={'second_lesson'}
        lesson_slug={'js0'}
      />
    )

    expect(
      screen.getByRole('link', {
        name: /second lesson/
      })
    ).toHaveAttribute('aria-current', 'page')
  })
})
