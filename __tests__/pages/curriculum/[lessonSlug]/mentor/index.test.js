jest.mock('@sentry/nextjs')

import React from 'react'
import MentorPage from '../../../../../pages/curriculum/[lessonSlug]/mentor/index'
import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../../../../graphql/queries/getApp'
import ADD_EXERCISE from '../../../../../graphql/queries/addExercise'

import * as Sentry from '@sentry/nextjs'

import dummyLessonData from '../../../../../__dummy__/lessonData'
import dummySessionData from '../../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../../__dummy__/alertData'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const getAppQueryMock = {
  request: { query: GET_APP },
  result: {
    data: {
      session: dummySessionData,
      lessons: [
        {
          ...dummyLessonData[0],
          id: 1
        },
        ...dummyLessonData
      ],
      alerts: dummyAlertData
    }
  }
}

const getAppQueryMockWithNoModules = {
  request: { query: GET_APP },
  result: {
    data: {
      session: dummySessionData,
      lessons: [
        {
          ...dummyLessonData[0],
          modules: [],
          id: 1
        }
      ],
      alerts: dummyAlertData
    }
  }
}

const fakeExercise = {
  moduleId: -1,
  description: 'exercise desc',
  answer: 'x',
  explanation: 'because x is the answer'
}

const addExerciseMutationMock = {
  request: {
    query: ADD_EXERCISE,
    variables: { ...fakeExercise, moduleId: 1 }
  },
  result: jest.fn(() => ({
    data: {
      addExercise: { ...fakeExercise }
    }
  }))
}

const addExerciseMutationMockSuccess = {
  request: {
    query: ADD_EXERCISE,
    variables: { ...fakeExercise, moduleId: 1 }
  },
  result: jest.fn(() => ({
    data: {
      addExercise: { ...fakeExercise, moduleId: 1 }
    }
  }))
}

const addExerciseMutationMockError = {
  request: {
    query: ADD_EXERCISE,
    variables: { ...fakeExercise, moduleId: 1 }
  },
  error: new Error('Error')
}

const mocks = [getAppQueryMock, addExerciseMutationMock]
const mocksWithError = [getAppQueryMock, addExerciseMutationMockError]
const mocksWithSuccess = [getAppQueryMock, addExerciseMutationMockSuccess]
const mocksWithNoModules = [
  getAppQueryMockWithNoModules,
  addExerciseMutationMock
]

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useRouterObj = {
  asPath: 'c0d3.com/curriculum/js1/mentor',
  query: {
    lessonSlug: 'js1'
  },
  push: jest.fn()
}

useRouter.mockImplementation(() => useRouterObj)

const fillOutExerciseForms = async () => {
  const [description, explanation] = screen.getAllByTestId('textbox')
  const answer = screen.getByTestId('input1')

  // the type event needs to be delayed so the Formik validations finish
  await userEvent.type(description, fakeExercise.description, { delay: 1 })
  await userEvent.type(answer, fakeExercise.answer, { delay: 1 })
  await userEvent.type(explanation, fakeExercise.explanation, { delay: 1 })
}

describe('Mentor page', () => {
  it('should not submit when inputs are empty', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const dropdownBtn = screen.getByTestId('dropdown-lesson')
    await userEvent.click(dropdownBtn)

    const dropdownItem = screen.getByText('module1')
    await userEvent.click(dropdownItem)

    const submitButton = await screen.findByText('Save exercise')
    await userEvent.click(submitButton)

    expect(screen.queryAllByText('Required')[0]).toBeInTheDocument()
  })

  it('should render Mentor page', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    expect(screen.queryAllByText('Select a module')[0]).toBeInTheDocument()
  })

  it('should fill out the inputs', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutExerciseForms()

    const [description, explanation] = screen.getAllByTestId('textbox')
    const answer = screen.getByTestId('input1')

    expect(description.value).toBe(fakeExercise.description)
    expect(explanation.value).toBe(fakeExercise.explanation)
    expect(answer.value).toBe(fakeExercise.answer)
  })

  it('should add exercise (submit)', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const dropdownBtn = screen.getByTestId('dropdown-lesson')
    await userEvent.click(dropdownBtn)

    const dropdownItem = await screen.findByText('module1')
    await userEvent.click(dropdownItem)

    await fillOutExerciseForms()

    const submitButton = screen.getByText('Save exercise')
    await userEvent.click(submitButton)

    expect(
      await screen.findByText('Added the exercise successfully!')
    ).toBeInTheDocument()
  })

  it('should not add exercise (submit) if no module is selected', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutExerciseForms()

    const submitButton = screen.getByText('Save exercise')
    await userEvent.click(submitButton)

    expect(
      await screen.findByText('Please select a module')
    ).toBeInTheDocument()
  })

  it('should set error when adding an exercise', async () => {
    expect.assertions(2)

    render(
      <MockedProvider mocks={mocksWithError}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const dropdownBtn = screen.getByTestId('dropdown-lesson')
    await userEvent.click(dropdownBtn)

    const dropdownItem = screen.queryByText('module1')
    await userEvent.click(dropdownItem)

    await fillOutExerciseForms()

    const submitButton = screen.queryByText('Save exercise')
    await userEvent.click(submitButton)

    expect(
      await screen.findByText('An error occurred. Please try again.')
    ).toBeInTheDocument()
    expect(Sentry.captureException).toBeCalled()
  })

  it('should successfully add an exercise', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocksWithSuccess}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const dropdownBtn = screen.getByTestId('dropdown-lesson')
    await userEvent.click(dropdownBtn)

    const dropdownItem = await screen.findByText('module1')
    await userEvent.click(dropdownItem)

    await fillOutExerciseForms()

    const submitButton = screen.queryByText('Save exercise')
    await userEvent.click(submitButton)

    expect(
      await screen.findByText('Added the exercise successfully!')
    ).toBeInTheDocument()
  })

  it('should render no modules if there are none', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocksWithNoModules}>
        <MentorPage />
      </MockedProvider>
    )

    // Helps the data to resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const dropdownBtn = screen.getByTestId('dropdown-lesson')
    await userEvent.click(dropdownBtn)

    const dropdownItem = screen.queryByText('module1')

    expect(dropdownItem).not.toBeInTheDocument()
  })
})
