import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import SubLessonLinks from './SubLessonLinks'

describe('SubLessonLinks component', () => {
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
    }
  ]

  test('should render links to all subLessons', () => {
    const lessonSlug = 'js0'
    render(
      <SubLessonLinks
        subLessons={subLessons}
        subLessonSlug={'first_lesson'}
        lessonSlug={lessonSlug}
      />
    )
    subLessons.forEach(cur => {
      const link = screen.getByRole('link', {
        name: new RegExp(cur.frontMatter.title)
      })

      expect(link).toBeInTheDocument
      expect(link).toHaveAttribute(
        'href',
        `/curriculum/${lessonSlug}/${cur.subLessonSlug}`
      )
    })
  })

  test('should render aria-current page on selected subLesson link', () => {
    render(
      <SubLessonLinks
        subLessons={subLessons}
        subLessonSlug={'second_lesson'}
        lessonSlug={'js0'}
      />
    )

    expect(
      screen.getByRole('link', {
        name: /second lesson/
      })
    ).toHaveAttribute('aria-current', 'page')
  })
})
