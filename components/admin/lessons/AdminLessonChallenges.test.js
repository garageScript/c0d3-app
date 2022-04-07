import '../../../__mocks__/useIsMac.mock'
import '../../../__mocks__/useBreakpoint.mock'
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Sentry from '@sentry/browser'
import { MockedProvider } from '@apollo/client/testing'
import { AdminLessonChallenges, NewChallenge } from './AdminLessonChallenges'
import dummyLessonData from '../../../__dummy__/lessonData'
import updateChallenge from '../../../graphql/queries/updateChallenge'
import createNewChallenge from '../../../graphql/queries/createChallenge'
jest.spyOn(Sentry, 'captureException').mockImplementation(() => {})
const challenges = [
  {
    id: '107',
    title: 'Sum of 2 Numbers',
    description:
      "Write a function that takes in 2 numbers and returns their sum.\n\nHere's how another developer might use your function:\n\n```\nsolution(5,9) // Should return 14\nsolution(4,1) // Should return 5\n```",
    order: 1
  },
  {
    id: '108',
    title: 'Sum of 3 Numbers',
    description:
      "Write a function that takes in 3 numbers and returns their sum.\n\nHere's how another developer might use your function:\n\n```\nsolution(5,9,2) // Should return 16\nsolution(4,1,9) // Should return 14\n```",
    order: 2
  }
]
const updateChallengeMock = {
  request: {
    query: updateChallenge,
    variables: {
      id: 107,
      title: 'New title',
      description: 'New description',
      order: 15,
      lessonId: 0
    }
  },
  result: {
    data: { updateChallenge: dummyLessonData[0] }
  }
}
const createNewChallengeMock = {
  request: {
    query: createNewChallenge,
    variables: {
      title: 'New challenge',
      description: 'New challenge description',
      order: 2,
      lessonId: 0
    }
  },
  result: {
    data: { createChallenge: dummyLessonData[0] }
  }
}

const mocks = [updateChallengeMock, createNewChallengeMock]

describe('AdminLessonChallenges component', () => {
  delete window.location
  const reload = jest.fn()
  window.location = { reload }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should update challenge', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonChallenges
          challenges={challenges}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    const title = screen.getAllByTestId('input1')[0]
    const description = screen.getAllByTestId('textbox')[0]
    const order = screen.getAllByTestId('input3')[0]

    await userEvent.type(title, '{backspace}New title', {
      delay: 1,
      initialSelectionEnd: title.value.length,
      initialSelectionStart: 0
    })
    await userEvent.type(description, '{backspace}New description', {
      delay: 1,
      initialSelectionEnd: description.value.length,
      initialSelectionStart: 0
    })
    await userEvent.type(order, '{backspace}15', {
      delay: 1,
      initialSelectionEnd: order.value.length,
      initialSelectionStart: 0
    })
    await waitFor(() =>
      userEvent.click(screen.getAllByText('Update Challenge')[0])
    )
    await waitFor(() => expect(reload).toBeCalled())
    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should create challenge', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewChallenge
          challenges={challenges}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    const title = screen.getByTestId('input0')
    const description = screen.getByTestId('textbox')
    const order = screen.getByTestId('input2')
    await userEvent.type(title, 'New challenge', { delay: 1 })
    await userEvent.type(description, 'New challenge description', { delay: 1 })
    await userEvent.type(order, '2', { delay: 1 })
    await waitFor(() => userEvent.click(screen.getByText('Create Challenge')))
    await waitFor(() => expect(reload).toBeCalledTimes(1))
    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should refuse updating challenge with incorrect info', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonChallenges
          challenges={challenges}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    const title = screen.getAllByTestId('input1')[0]
    const description = screen.getAllByTestId('textbox')[0]
    const order = screen.getAllByTestId('input3')[0]
    title.setSelectionRange(0, title.value.length)
    description.setSelectionRange(0, description.value.length)
    order.setSelectionRange(0, order.value.length)
    await userEvent.type(title, '{backspace}New title', { delay: 1 })
    await userEvent.type(description, '{backspace}New description', {
      delay: 1
    })
    await userEvent.type(order, '{backspace}', { delay: 1 })
    await waitFor(() =>
      userEvent.click(screen.getAllByText('Update Challenge')[0])
    )
    await waitFor(() => expect(reload).not.toBeCalled())
    await waitFor(() => expect(screen.getByText('Required')).toBeTruthy())
    expect(container).toMatchSnapshot()
  })
  test('Should refuse creating  new challenge with incorrect info', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewChallenge
          challenges={challenges}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    const title = screen.getByTestId('input0')
    const description = screen.getByTestId('textbox')
    const order = screen.getByTestId('input2')
    await userEvent.type(title, 'New challenge', { delay: 1 })
    await userEvent.type(description, 'New challenge description', { delay: 1 })
    await userEvent.type(order, '{backspace}', { delay: 1 })
    await waitFor(() => userEvent.click(screen.getByText('Create Challenge')))
    await waitFor(() => expect(reload).not.toBeCalled())
    await waitFor(() => expect(screen.getByText('Required')).toBeTruthy())
    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should capture error when updating', async () => {
    const errorMock = { ...updateChallengeMock, error: new Error('fail') }
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <AdminLessonChallenges
          challenges={challenges}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    const titles = screen.getAllByTestId('input1')
    const descriptions = screen.getAllByTestId('textbox')
    const orders = screen.getAllByTestId('input3')
    await userEvent.clear(titles[0])
    await userEvent.clear(descriptions[0])
    await userEvent.clear(orders[0])
    await userEvent.type(titles[0], 'New title', { delay: 1 })
    await userEvent.type(descriptions[0], 'New description', { delay: 1 })
    await userEvent.type(orders[0], '15', { delay: 1 })
    await waitFor(() =>
      userEvent.click(screen.getAllByText('Update Challenge')[0])
    )
    await waitFor(() => expect(Sentry.captureException).toBeCalled())
  })
  test('Should capture error when creating new challenge', async () => {
    const errorMock = { ...createNewChallengeMock, error: new Error('fail') }
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <NewChallenge
          challenges={challenges}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    const title = screen.getByTestId('input0')
    const description = screen.getByTestId('textbox')
    const order = screen.getByTestId('input2')
    await userEvent.type(title, 'New challenge', { delay: 1 })
    await userEvent.type(description, 'New challenge description', { delay: 1 })
    await userEvent.type(order, '2', { delay: 1 })
    await waitFor(() => userEvent.click(screen.getByText('Create Challenge')))
    await waitFor(() => expect(Sentry.captureException).toBeCalled())
  })
  test('Should render undefined challenges', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonChallenges lessonId={0} setLessons={() => true} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render nulled challenges', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonChallenges
          lessonId={0}
          challenges={[null, null]}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render a challenge without title', async () => {
    const titlessChallenge = { ...challenges[0] }
    delete titlessChallenge.title
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AdminLessonChallenges
          challenges={[titlessChallenge]}
          lessonId={0}
          setLessons={() => true}
        />
      </MockedProvider>
    )
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
