jest.mock('@sentry/react')
import * as Sentry from '@sentry/react'

import React from 'react'
import LessonPage from '../../../../../../pages/admin/lessons/[lessonSlug]/[pageName]/index'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import dummyLessonData from '../../../../../../__dummy__/lessonData'
import dummySessionData from '../../../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../../../__dummy__/alertData'
import getExercisesData from '../../../../../../__dummy__/getExercisesData'
import '@testing-library/jest-dom'
import GET_APP from '../../../../../../graphql/queries/getApp'
import GET_EXERCISES from '../../../../../../graphql/queries/getExercises'
import REMOVE_EXERCISE_FLAG from '../../../../../../graphql/queries/removeExerciseFlag'
import DELETE_EXERCISE from '../../../../../../graphql/queries/deleteExercise'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import userEvent from '@testing-library/user-event'
import UPDATE_LESSON from '../../../../../../graphql/queries/updateLesson'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'
import { AddModuleDocument } from '../../../../../../graphql'

const MODULES = gql`
  query {
    modules {
      id
      name
      content
      lesson {
        id
      }
      order
    }
  }
`

const modules = [
  {
    id: 1,
    name: 'module1',
    content: 'this is module1',
    lesson: {
      id: 1
    },
    order: 1
  },
  {
    id: 2,
    name: 'module2',
    content: 'this is module2',
    lesson: {
      id: 1
    },
    order: 2
  },
  {
    id: 3,
    name: 'module3',
    content: 'this is module3',
    lesson: {
      id: 2
    },
    order: 3
  },
  {
    id: 4,
    name: 'module4',
    content: 'this is module4',
    lesson: {
      id: 2
    },
    order: 4
  }
]

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

const modulesQueryMock = {
  request: { query: MODULES },
  result: {
    data: {
      modules
    }
  }
}

const js1 = {
  id: 2,
  title: 'Functions & JavaScript',
  description:
    'Learn how to solve simple algorithm problems recursively with the following exercises. ',
  docUrl:
    'https://www.notion.so/garagescript/JS-1-Functions-01dd8400b85f40d083966908acbfa184',
  githubUrl: 'https://git.c0d3.com/song/curriculum',
  videoUrl:
    'https://www.youtube.com/watch?v=H-eqRQo8KoI&list=PLKmS5c0UNZmewGBWlz0l9GZwh3bV8Rlc7&index=1',
  order: 1,
  slug: 'js1',
  chatUrl: 'https://chat.c0d3.com/c0d3/channels/js2-arrays'
}

const updateLessonMutationMock = {
  request: { query: UPDATE_LESSON, variables: js1 },
  result: jest.fn(() => ({
    data: {
      updateLesson: js1
    }
  }))
}

const updateLessonMutationMockWithError = {
  request: { query: UPDATE_LESSON, variables: js1 },
  error: new Error('Error')
}

const addModuleMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      name: 'Functions',
      content: 'Functions are cool',
      order: 1,
      lessonId: 2
    }
  },
  result: {
    data: {
      addModule: {
        id: 1,
        name: 'Functions',
        content: 'Functions are cool',
        order: 1,
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  }
}

const getExercisesMock = {
  request: {
    query: GET_EXERCISES
  },
  result: {
    data: {
      ...getExercisesData,
      exercises: [...getExercisesData.exercises].map(e => ({
        ...e,
        flaggedAt: '2020-01-10',
        flagReason: 'Bad exercise'
      }))
    }
  }
}

let getExercisesWithRefetchCalled = false
const getExerciseWithRefetchMock = {
  request: {
    query: GET_EXERCISES
  },
  newData: () => {
    if (getExercisesWithRefetchCalled) {
      return {
        data: {
          ...getExercisesData,
          exercises: [
            [...getExercisesData.exercises].map(e => ({
              ...e,
              flaggedAt: '2020-01-10',
              flagReason: 'Bad exercise'
            }))[0]
          ]
        }
      }
    } else {
      getExercisesWithRefetchCalled = true
      return {
        data: {
          ...getExercisesData,
          exercises: [...getExercisesData.exercises].map(e => ({
            ...e,
            flaggedAt: '2020-01-10',
            flagReason: 'Bad exercise'
          }))
        }
      }
    }
  }
}

const deleteExerciseMock = {
  request: {
    query: DELETE_EXERCISE,
    variables: { id: 1 }
  },
  result: {
    data: {
      deleteExercise: {
        id: 1
      }
    }
  }
}

const unflagExerciseMock = {
  request: {
    query: REMOVE_EXERCISE_FLAG,
    variables: {
      id: 1
    }
  },
  result: {
    data: {
      removeExerciseFlag: {
        id: 1
      }
    }
  }
}

const mocks = [
  getAppQueryMock,
  getAppQueryMock,
  getAppQueryMock,
  modulesQueryMock,
  updateLessonMutationMock,
  addModuleMock,
  getExercisesMock
]

const mocksWithError = [
  getAppQueryMock,
  modulesQueryMock,
  updateLessonMutationMockWithError,
  addModuleMock,
  getExercisesMock
]

const mocksWithRefetchExercises = [
  getAppQueryMock,
  getAppQueryMock,
  getAppQueryMock,
  getExerciseWithRefetchMock,
  deleteExerciseMock,
  unflagExerciseMock
]

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useRouterObj = {
  asPath: 'c0d3.com/admin/lessons/js1/modules',
  query: {
    pageName: 'modules',
    lessonSlug: 'js1'
  },
  push: jest.fn(),
  isReady: true
}

describe('modules', () => {
  beforeAll(() => useRouter.mockImplementation(() => useRouterObj))

  it('Should render modules page', async () => {
    expect.assertions(2)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const module2 = modules[2].name
    const module3 = modules[3].name

    // The default input values are set as module3 name and content.
    expect(screen.getByText(module2)).toBeInTheDocument()
    expect(screen.getByText(module3)).toBeInTheDocument()
  })

  it('Should add a module', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await userEvent.click(screen.getByText('ADD NEW MODULE'))

    await userEvent.type(screen.getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(screen.getByTestId('input2'), '1', {
      delay: 1
    })
    await userEvent.type(screen.getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })

    const submit = screen.getByText('ADD MODULE')

    await userEvent.click(submit)

    expect(
      await screen.findByText('Added the item Functions successfully!')
    ).toBeInTheDocument()
  })

  it('Should set "add module" mode', async () => {
    expect.assertions(2)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))
    await userEvent.click(screen.getByText('ADD NEW MODULE'))

    expect(screen.getByTestId('input0').value).toBe('')
    expect(screen.getByTestId('textbox').value).toBe('')
  })

  it('Should switch to another module', async () => {
    expect.assertions(2)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    // Had to switch the lesson because useMemo won't update otherwise.
    const selectedModule = modules[2]

    await userEvent.click(screen.getByText(selectedModule.name))

    expect(screen.getByTestId('input0').value).toBe(selectedModule.name)
    expect(screen.getByTestId('textbox').value).toBe(selectedModule.content)
  })

  it('Should render default page', async () => {
    expect.assertions(1)

    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons/1/none',
      query: {
        pageName: 'none',
        lessonSlug: 'js1'
      }
    }))

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    expect(screen.queryByTestId('textbox')).not.toBeInTheDocument()
  })

  it('Should set default lesson if there is no lesson param', async () => {
    expect.assertions(1)

    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons/1/modules',
      query: {
        pageName: 'modules',
        lessonSlug: undefined
      }
    }))

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    expect(screen.queryByText('None')).toBeInTheDocument()
  })

  it('Should switch lessons', async () => {
    expect.assertions(1)

    useRouter.mockImplementation(() => useRouterObj)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const dropdown = screen.getByText(dummyLessonData[1].title)
    await userEvent.click(dropdown)

    const dropdownItem = screen.getByText(dummyLessonData[2].title)
    await userEvent.click(dropdownItem)

    expect(useRouterObj.push).toBeCalled()
  })

  it('Should not set a tab as selected', async () => {
    expect.assertions(1)

    useRouter.mockImplementation(() => ({
      ...useRouterObj,
      query: {
        pageName: 'none',
        lessonSlug: undefined
      }
    }))

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    expect(screen.getByText('MODULES').className).not.toEqual(
      'navCard__tabsNav__nav__item'
    )
  })
})

describe('introduction', () => {
  const useRouterIntroduction = {
    ...useRouterObj,
    asPath: 'c0d3.com/admin/lessons/js1/introduction',
    query: {
      ...useRouterObj.query,
      pageName: 'introduction'
    }
  }

  beforeAll(() => useRouter.mockImplementation(() => useRouterIntroduction))

  const randomTitle = 'Functions & JavaScript'

  const fillOutIntroductionForms = async () => {
    const titleField = screen.getByTestId('input1')

    // the type event needs to be delayed so the Formik validations finish
    await userEvent.type(titleField, randomTitle, { delay: 1 })
  }

  it('Should render introduction', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutIntroductionForms()

    await waitFor(() =>
      // input1 is the Title
      expect(screen.getByTestId('input1').value).toBe(randomTitle)
    )
  })

  it('Should update lesson (submit)', async () => {
    expect.hasAssertions()

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutIntroductionForms()
    fireEvent.click(screen.getByText('Save changes'))

    await act(() => new Promise(res => setTimeout(res, 0)))

    await waitFor(() => {
      expect(updateLessonMutationMock.result).toBeCalled()
    })
  })

  it('Should close success alert', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutIntroductionForms()
    fireEvent.click(screen.getByText('Save changes'))

    await act(() => new Promise(res => setTimeout(res, 0)))

    await userEvent.click(await screen.findByLabelText('Close alert'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('Should not update lesson on invalid inputs', async () => {
    expect.hasAssertions()

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    const titleInput = screen.getByTestId('input1')
    await userEvent.clear(titleInput)

    fireEvent.click(screen.getByText('Save changes'))

    await act(() => new Promise(res => setTimeout(res, 0)))

    await waitFor(() => {
      expect(screen.queryByText('Required')).toBeInTheDocument()
    })
  })

  it('Should capture error with Sentry', async () => {
    expect.hasAssertions()

    render(
      <MockedProvider mocks={mocksWithError}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutIntroductionForms()
    fireEvent.click(screen.getByText('Save changes'))

    await act(() => new Promise(res => setTimeout(res, 0)))

    await waitFor(() => {
      expect(Sentry.captureException).toBeCalled()
    })
  })

  it('Should close error alert', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocksWithError}>
        <LessonPage />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    await fillOutIntroductionForms()
    fireEvent.click(screen.getByText('Save changes'))

    await act(() => new Promise(res => setTimeout(res, 0)))

    await userEvent.click(await screen.findByLabelText('Close alert'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('exercises', () => {
  const useRouterExercises = {
    ...useRouterObj,
    asPath: 'c0d3.com/admin/lessons/js0/exercises',
    query: {
      ...useRouterObj.query,
      lessonSlug: 'js0',
      pageName: 'exercises'
    }
  }

  beforeAll(() => useRouter.mockImplementation(() => useRouterExercises))

  it('Should render exercises page', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <LessonPage />
      </MockedProvider>
    )

    expect((await screen.findAllByText('Email')).length).toBe(3)
  })

  it('Should not render exercises if they are none', async () => {
    expect.assertions(1)

    const mocksOfMocks = mocks.slice(0, -1)
    mocksOfMocks.push({
      ...getExercisesMock,
      result: {
        data: {
          ...getExercisesData,
          exercises: [...getExercisesData.exercises].map(e => ({
            ...e,
            flaggedAt: '2020-01-10',
            flagReason: 'Bad exercise',
            module: {
              ...e.module,
              lesson: {
                ...e.module.lesson,
                slug: 'js3'
              }
            }
          }))
        }
      }
    })

    render(
      <MockedProvider mocks={mocksOfMocks}>
        <LessonPage />
      </MockedProvider>
    )

    await act(() => new Promise(res => setTimeout(res, 0)))

    expect(screen.getByText('addExercise page')).toBeInTheDocument()
  })

  it('Should refresh the exercises upon removing one', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocksWithRefetchExercises}>
        <LessonPage />
      </MockedProvider>
    )

    const [removeExerciseBtn] = await screen.findAllByText('REMOVE EXERCISE')
    await userEvent.click(removeExerciseBtn)

    await act(() => new Promise(res => setTimeout(res, 0)))

    expect((await screen.findAllByText('Email')).length).toBe(1)
  })

  it('Should refresh the exercises upon unflagging one', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocksWithRefetchExercises}>
        <LessonPage />
      </MockedProvider>
    )

    const [removeExerciseBtn] = await screen.findAllByText('UNFLAG EXERCISE')
    await userEvent.click(removeExerciseBtn)

    expect((await screen.findAllByText('Email')).length).toBe(1)
  })
})
