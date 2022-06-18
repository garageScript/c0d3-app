import * as React from 'react'
import { render } from '@testing-library/react'
import { AdminLessonCard } from './AdminLessonCard'
import '@testing-library/jest-dom'

const dummyLessonData = {
  lesson: {
    title: 'Foundations of Javascript',
    description: 'A super simple introduction to help you get started!',
    docUrl: undefined,
    challenges: [],
    id: 0,
    order: 0,
    slug: 'js0'
  },
  pendingFlaggedQuestions: 2
}

describe('AdminLessonCard component', () => {
  test("Button href should be '_blank' if lesson docUrl is undefined ", async () => {
    expect.assertions(2)
    
    const { container, getByTestId } = render(
      <AdminLessonCard {...dummyLessonData} />
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('button').href.split('/').slice(-1)[0]).toBe('_blank')
  })
})
