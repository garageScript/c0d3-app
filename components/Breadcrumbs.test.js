import React from 'react'
import { render } from '@testing-library/react'
import Breadcrumbs from './Breadcrumbs.tsx'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const lessons = [
  { title: 'Foundations of JavaScript', id: 1 },
  { title: 'Variables', id: 2 }
]

describe('BreadCrumbs component', () => {
  it('Should render dropdown', () => {
    expect.assertions(1)

    const setState = jest.fn()
    const lesson = {
      title: lessons[0].title,
      id: lessons[0].id
    }

    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons'
    }))

    const { queryByText } = render(
      <Breadcrumbs
        omitHomeRoute={false}
        lesson={lesson}
        setLesson={setState}
        lessons={lessons}
        homeTitle="Home"
      />
    )

    expect(queryByText(lesson.title)).toBeInTheDocument()
  })

  it('Should render default values', () => {
    expect.assertions(1)

    const setState = jest.fn()
    const lesson = {
      title: lessons[0].title,
      id: lessons[0].id
    }

    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons'
    }))

    const { queryByText } = render(
      <Breadcrumbs lesson={lesson} setLesson={setState} lessons={lessons} />
    )

    expect(queryByText('Home')).toBeInTheDocument()
  })

  it('Should render "None" when no lessonTitle is passed', () => {
    expect.assertions(1)

    const setState = jest.fn()

    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons'
    }))

    const { queryByText } = render(
      <Breadcrumbs
        lesson={{ title: '', id: -1 }}
        setLesson={setState}
        lessons={lessons}
      />
    )

    expect(queryByText('None')).toBeInTheDocument()
  })

  it('Should update lesson title on dropdown item click', async () => {
    expect.assertions(1)

    const setState = jest.fn()
    const lesson = {
      title: lessons[0].title,
      id: lessons[0].id
    }

    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons'
    }))

    const { queryByText } = render(
      <Breadcrumbs
        omitHomeRoute={false}
        lesson={lesson}
        setLesson={setState}
        lessons={lessons}
        homeTitle="Home"
      />
    )

    const dropDown = queryByText(lesson.title)

    await userEvent.click(dropDown)

    const dropDownItem = queryByText(lessons[1].title)

    await userEvent.click(dropDownItem)

    expect(setState).toBeCalledWith(lessons[1])
  })
})
