import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddExercises from '../../../../../pages/curriculum/[lessonSlug]/mentor'
import { useRouter } from 'next/router'
import { MockedProvider } from '@apollo/client/testing'
import getExercisesData from '../../../../../__dummy__/getExercisesData'
import GET_EXERCISES from '../../../../../graphql/queries/getExercises'
import REMOVE_EXERCISE from '../../../../../graphql/queries/removeExercise'
import GET_SESSION from '../../../../../graphql/queries/getSession'
import dummySessionData from '../../../../../__dummy__/sessionData'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

describe('Mentor page', () => {
  const { query, push } = useRouter()
  query['lessonSlug'] = 'js0'

  test('Should render correctly', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    screen.getByRole('link', { name: 'CHALLENGES' })
    screen.getByRole('link', { name: 'EXERCISES' })
    screen.getByRole('link', { name: 'LESSON' })
  })

  test('Should handle when exercises are null', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: null
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    expect(await screen.findByText('500 Error!')).toBeInTheDocument()
  })

  test('Should remove exercise', async () => {
    expect.assertions(1)

    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      },
      {
        request: {
          query: REMOVE_EXERCISE,
          variables: {
            id: 1
          }
        },
        result: {
          data: {
            removeExercise: {
              id: 1
            }
          }
        },
        newData: jest.fn(() => ({
          data: {
            removeExercise: {
              id: 1
            }
          }
        }))
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    // dropdown toggle
    await userEvent.click(screen.getAllByTestId('dropdown-lesson')[0])
    // first item in the dropdown options
    await userEvent.click(screen.getByText('Delete'))

    expect(mocks.at(-1).newData).toBeCalled()
  })

  test('Should remove exercise item and its QUERY INFO', async () => {
    expect.assertions(1)

    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      },
      {
        request: {
          query: REMOVE_EXERCISE,
          variables: {
            id: 1
          }
        },
        result: {
          data: {
            removeExercise: {
              id: 1
            }
          }
        },
        newData: jest.fn(() => ({
          data: {
            removeExercise: {
              id: 2
            }
          }
        }))
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    // dropdown toggle
    await userEvent.click(screen.getAllByTestId('dropdown-lesson')[0])
    // first item in the dropdown options
    await userEvent.click(screen.getByText('Delete'))

    expect(mocks.at(-1).newData).toBeCalled()
  })

  test('Should not render exercises if the user id mismatch exercise author.id', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData,
              user: {
                id: 4
              }
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    expect(screen.queryByText('Numbers')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    ).toBeInTheDocument()
  })

  test('Should push to addExercise page', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    const { getByRole, queryByRole, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() =>
      getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    const solveExercisesButton = getByRole('button', {
      name: 'ADD EXERCISE'
    })

    fireEvent.click(solveExercisesButton)

    expect(push).toBeCalledWith('/curriculum/js0/mentor/addExercise')
  })

  test('Should not render lessons nav card tab if lesson docUrl is null', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: {
            ...getExercisesData,
            lessons: getExercisesData.lessons.map(lesson => ({
              ...lesson,
              docUrl: null
            }))
          }
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    screen.getByRole('link', { name: 'CHALLENGES' })
    screen.getByRole('link', { name: 'EXERCISES' })
    expect(screen.queryByRole('link', { name: 'LESSONS' })).toBeNull()
  })

  test('Should render a 500 error page if the lesson data is null', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: {
            ...getExercisesData,
            lessons: null
          }
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() => screen.getByRole('heading', { name: /500 Error/i }))
  })

  test('Should render a 404 error page if the lesson is not found', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: {
            ...getExercisesData,
            lessons: []
          }
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() => screen.getByRole('heading', { name: /404 Error/i }))
  })

  test('Should render a loading spinner if useRouter is not ready', async () => {
    useRouter.mockImplementation(() => ({
      isReady: false
    }))
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      },
      {
        request: { query: GET_SESSION },
        result: {
          data: {
            session: {
              ...dummySessionData
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddExercises />
      </MockedProvider>
    )

    await waitFor(() => screen.getByText('Loading...'))
  })
})
