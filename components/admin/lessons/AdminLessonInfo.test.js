import '../../../__mocks__/useIsMac.mock'
import '../../../__mocks__/useBreakpoint.mock'
import * as React from 'react'
import * as Sentry from '@sentry/browser'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AdminLessonInfo } from './AdminLessonInfo'
import dummyLessonData from '../../../__dummy__/lessonData'
import { MockedProvider } from '@apollo/client/testing'
import updateLesson from '../../../graphql/queries/updateLesson'
import createLesson from '../../../graphql/queries/createLesson'
jest.mock('@sentry/browser')

const updateLessonMock = {
  request: {
    query: updateLesson,
    variables: {
      id: 5,
      title: 'Foundations of JavaScript',
      description: 'New description',
      docUrl:
        'https://www.notion.so/garagescript/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672',
      githubUrl: '',
      videoUrl:
        'https://www.youtube.com/watch?v=H-eqRQo8KoI&list=PLKmS5c0UNZmewGBWlz0l9GZwh3bV8Rlc7&index=1',
      order: 10,
      slug: 'js0',
      chatUrl: 'https://chat.c0d3.com/c0d3/channels/js1-variablesfunction'
    }
  },
  result: {
    data: { updateLesson: dummyLessonData }
  }
}

const createLessonMock = {
  request: {
    query: createLesson,
    variables: {
      title: 'New Lesson',
      description: 'New description',
      docUrl: '',
      githubUrl: '',
      videoUrl: '',
      order: 12,
      slug: 'js12',
      chatUrl: ''
    }
  },
  result: {
    data: {
      createLesson: dummyLessonData
    }
  }
}

const mocks = [updateLessonMock, createLessonMock]

describe('AdminLessonsInfo component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should create new lesson', async () => {
    delete window.location
    const reload = jest.fn()
    window.location = { reload }
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={jest.fn(() => true)}
          selectedLesson={dummyLessonData.length}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    //new lesson title
    await userEvent.type(screen.getByTestId('input0'), 'New Lesson', {
      delay: 1
    })
    //new lesson description
    await userEvent.type(
      screen.getByPlaceholderText('Type something...'),
      'New description',
      { delay: 1 }
    )
    //new lesson order
    await userEvent.type(screen.getByTestId('input5'), '12', { delay: 1 })
    //new lesson slug
    await userEvent.type(screen.getByTestId('input6'), 'js12', { delay: 1 })
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Create Lesson' }))
    )
    expect(container).toMatchSnapshot()
    await waitFor(() => expect(reload).toBeCalled())
  })

  test('Should update lesson sucessfully', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={jest.fn(() => true)}
          selectedLesson={0}
        />
      </MockedProvider>
    )

    const newLesson = screen.getAllByTestId('input1')[1]

    /*
     * Previously we were using the clear function from the userEvent library
     * After updating to version 13.5.0, the clear function stopped working so
     * to work around that I used setSelectionRange and with the type userEvent,
     * I was able to modify the inputs. The link to the docs is below:
     * https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options
     */

    await userEvent.type(newLesson, 'New Lesson', {
      delay: 1,
      initialSelectionStart: 0,
      initialSelectionEnd: 16
    })
    const description = screen.getByText(
      'A super simple introduction to help you get started!'
    )
    await userEvent.type(description, 'New description', {
      delay: 1,
      initialSelectionStart: 0,
      initialSelectionEnd: 53
    })
    const order = screen.getByTestId('input6')
    await userEvent.type(order, '10', {
      delay: 1,
      initialSelectionStart: 0,
      initialSelectionEnd: 1
    })
    await userEvent.click(screen.getByRole('button', { name: 'Update Lesson' }))
    expect(description.textContent).toEqual('New description')
    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should refuse updating lesson without order', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={jest.fn(() => true)}
          selectedLesson={0}
        />
      </MockedProvider>
    )
    await waitFor(() => userEvent.clear(screen.getByTestId('input6')))
    await userEvent.click(screen.getByRole('button', { name: 'Update Lesson' }))
    await waitFor(() => expect(screen.getByText('Required')).toBeTruthy())
  })

  test('Should refuse creating new lesson incomplete info', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={jest.fn(() => true)}
          selectedLesson={dummyLessonData.length}
        />
      </MockedProvider>
    )
    await userEvent.type(screen.getByTestId('input0'), 'Incorrect Lesson', {
      delay: 1
    })
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Create Lesson' }))
    )
    await waitFor(() => expect(screen.getAllByText('Required')).toBeTruthy())
  })

  test('Should render undefined lessons', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonInfo setLessons={() => {}} selectedLesson={0} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render non-existent lesson', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={() => {}}
          selectedLesson={100}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  test('Should capture error when creating lesson', async () => {
    const errorMock = { ...createLessonMock, error: new Error('fail') }
    delete errorMock.result
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={jest.fn(() => true)}
          selectedLesson={dummyLessonData.length}
        />
      </MockedProvider>
    )
    await userEvent.type(screen.getByTestId('input0'), 'New Lesson', {
      delay: 1
    })
    await userEvent.type(
      screen.getByPlaceholderText('Type something...'),
      'New description',
      { delay: 1 }
    )
    await userEvent.type(screen.getByTestId('input5'), '12', { delay: 1 })
    await userEvent.type(screen.getByTestId('input6'), 'js12', { delay: 1 })
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Create Lesson' }))
    )
    await waitFor(() => expect(Sentry.captureException).toBeCalled())
  })

  test('Should capture error when updating lesson', async () => {
    const errorMock = { ...updateLessonMock, error: new Error('fail') }
    delete errorMock.result
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <AdminLessonInfo
          lessons={dummyLessonData}
          setLessons={jest.fn(() => true)}
          selectedLesson={0}
        />
      </MockedProvider>
    )
    await userEvent.clear(screen.getAllByTestId('input1')[1])
    await userEvent.type(screen.getAllByTestId('input1')[1], 'New Lesson', {
      delay: 1
    })
    const description = screen.getByText(
      'A super simple introduction to help you get started!'
    )
    await userEvent.type(description, 'New description', {
      initialSelectionStart: 0,
      initialSelectionEnd: 52
    })
    await userEvent.clear(screen.getByTestId('input6'))
    await userEvent.type(screen.getByTestId('input6'), '10', { delay: 1 })
    await userEvent.click(screen.getByRole('button', { name: 'Update Lesson' }))

    await waitFor(() => expect(Sentry.captureException).toBeCalled())
  })
})
