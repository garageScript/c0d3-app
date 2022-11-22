import React from 'react'
import AddNewLessonPage from '../../../../../pages/admin/lessons/new'
import GET_APP from '../../../../../graphql/queries/getApp'
import CREATE_LESSON from '../../../../../graphql/queries/createLesson'
import dummySessionData from '../../../../../__dummy__/sessionData'
import dummyLessonsData from '../../../../../__dummy__/lessonData'
import dummyAlertData from '../../../../../__dummy__/alertData'
import { act, render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import * as Sentry from '@sentry/browser'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const createdLesson = {
  id: null,
  title: 'New Lesson',
  description: 'New description',
  docUrl: '',
  githubUrl: '',
  videoUrl: '',
  order: 10,
  slug: 'js10',
  chatUrl: ''
}

const createLessonMock = {
  request: {
    query: CREATE_LESSON,
    variables: {
      title: 'New Lesson',
      description: 'New description',
      docUrl: '',
      githubUrl: '',
      videoUrl: '',
      order: 10,
      slug: 'js10',
      chatUrl: ''
    }
  },
  result: {
    data: {
      createLesson: dummyLessonsData
    }
  },
  newData: jest.fn(() => ({
    data: {
      createLesson: dummyLessonsData
    }
  }))
}
const createLessonMockWithError = {
  request: {
    query: CREATE_LESSON,
    variables: {
      title: 'New Lesson',
      description: 'New description',
      docUrl: '',
      githubUrl: '',
      videoUrl: '',
      order: 10,
      slug: 'js10',
      chatUrl: ''
    }
  },
  error: new Error('error')
}

const getAppQueryMock = {
  request: { query: GET_APP },
  result: {
    data: {
      session: dummySessionData,
      lessons: dummyLessonsData,
      alerts: dummyAlertData
    }
  }
}

const mocks = [getAppQueryMock, createLessonMock]
const mocksWithError = [getAppQueryMock, createLessonMockWithError]

describe('AddNewLesson Page', () => {
  const { push } = useRouter()

  it('Should add a new lesson', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <AddNewLessonPage />
      </MockedProvider>
    )

    await act(() => new Promise(res => setTimeout(res, 0)))

    const title = screen.getByTestId('input0')
    await userEvent.type(title, createdLesson.title)

    const description = screen.getByTestId('textbox')
    await userEvent.type(description, createdLesson.description)

    const submitBtn = screen.getByText('Create Lesson')
    await userEvent.click(submitBtn)

    expect(createLessonMock.newData).toBeCalled()
  })

  it('Should not add a new lesson if inputs are invalid', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <AddNewLessonPage />
      </MockedProvider>
    )

    await act(() => new Promise(res => setTimeout(res, 0)))

    const submitBtn = screen.getByText('Create Lesson')
    await userEvent.click(submitBtn)

    expect(createLessonMock.newData).not.toBeCalled()
  })

  it('Should catch error if it could not add a new lesson', async () => {
    expect.assertions(1)

    jest.spyOn(Sentry, 'captureException')

    render(
      <MockedProvider mocks={mocksWithError}>
        <AddNewLessonPage />
      </MockedProvider>
    )

    await act(() => new Promise(res => setTimeout(res, 0)))

    const title = screen.getByTestId('input0')
    await userEvent.type(title, createdLesson.title)

    const description = screen.getByTestId('textbox')
    await userEvent.type(description, createdLesson.description)

    const submitBtn = screen.getByText('Create Lesson')
    await userEvent.click(submitBtn)

    // Waiting for the mutation to throw an error
    await act(() => new Promise(res => setTimeout(res, 0)))

    expect(Sentry.captureException).toBeCalled()
  })

  it('Should close success alert', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <AddNewLessonPage />
      </MockedProvider>
    )

    await act(() => new Promise(res => setTimeout(res, 0)))

    const title = screen.getByTestId('input0')
    await userEvent.type(title, createdLesson.title)

    const description = screen.getByTestId('textbox')
    await userEvent.type(description, createdLesson.description)

    const submitBtn = screen.getByText('Create Lesson')
    await userEvent.click(submitBtn)

    await userEvent.click(await screen.findByLabelText('Close alert'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('Should close error alert', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocksWithError}>
        <AddNewLessonPage />
      </MockedProvider>
    )

    await act(() => new Promise(res => setTimeout(res, 0)))

    const title = screen.getByTestId('input0')
    await userEvent.type(title, createdLesson.title)

    const description = screen.getByTestId('textbox')
    await userEvent.type(description, createdLesson.description)

    const submitBtn = screen.getByText('Create Lesson')
    await userEvent.click(submitBtn)

    await userEvent.click(await screen.findByLabelText('Close alert'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
