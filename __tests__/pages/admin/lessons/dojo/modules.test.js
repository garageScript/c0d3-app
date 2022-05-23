import React from 'react'
import Modules from '../../../../../pages/admin/lessons/dojo/modules'
import { act, render, screen, waitFor } from '@testing-library/react'
import dummyLessonData from '../../../../../__dummy__/lessonData'
import dummySessionData from '../../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../../__dummy__/alertData'
import '@testing-library/jest-dom'
import GET_APP from '../../../../../graphql/queries/getApp'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import userEvent from '@testing-library/user-event'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const MODULES = gql`
  query {
    modules {
      id
      name
      content
      lesson {
        id
      }
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
    }
  },
  {
    id: 2,
    name: 'module2',
    content: 'this is module2',
    lesson: {
      id: 1
    }
  },
  {
    id: 3,
    name: 'module3',
    content: 'this is module3',
    lesson: {
      id: 2
    }
  },
  {
    id: 4,
    name: 'module4',
    content: 'this is module4',
    lesson: {
      id: 2
    }
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

const mocks = [getAppQueryMock, modulesQueryMock]

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('modules', () => {
  it('Should render modules', async () => {
    // expect.assertions(2)

    // Modify the path so the lessons dropdown appears
    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons/dojo/modules'
    }))

    render(
      <MockedProvider mocks={mocks}>
        <Modules />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    // Had to switch the lesson because useMemo won't update otherwise.
    const dropdown = screen.getByText(dummyLessonData[0].title)
    await userEvent.click(dropdown)

    const item = screen.getByText(dummyLessonData[1].title)
    await userEvent.click(item)

    const module3 = modules[2].name
    const module4 = modules[3].name

    // The default input values are set as module3 name and content.
    expect(screen.getAllByText(module3)[0]).toBeInTheDocument()
    expect(screen.getByText(module4)).toBeInTheDocument()
  })

  it('Should set "add module" mode', async () => {
    expect.assertions(2)

    // Modify the path so the lessons dropdown appears
    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons/dojo/modules'
    }))

    render(
      <MockedProvider mocks={mocks}>
        <Modules />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    // Had to switch the lesson because useMemo won't update otherwise.
    const dropdown = screen.getByText(dummyLessonData[0].title)
    await userEvent.click(dropdown)

    const item = screen.getByText(dummyLessonData[1].title)
    await userEvent.click(item)

    await userEvent.click(screen.getByText('ADD NEW MODULE'))

    expect(screen.getByTestId('input0').value).toBe('')
    expect(screen.getByTestId('textbox').value).toBe('')
  })

  it('Should switch to another module', async () => {
    expect.assertions(2)

    // Modify the path so the lessons dropdown appears
    useRouter.mockImplementation(() => ({
      asPath: 'c0d3.com/admin/lessons/dojo/modules'
    }))

    render(
      <MockedProvider mocks={mocks}>
        <Modules />
      </MockedProvider>
    )

    // Used to make the queries resolve
    await act(() => new Promise(res => setTimeout(res, 0)))

    // Had to switch the lesson because useMemo won't update otherwise.
    const dropdown = screen.getByText(dummyLessonData[0].title)
    await userEvent.click(dropdown)

    const item = screen.getByText(dummyLessonData[1].title)
    await userEvent.click(item)

    const selectedModule = modules[3]

    await userEvent.click(screen.getByText(modules[3].name))

    expect(screen.getByTestId('input0').value).toBe(selectedModule.name)
    expect(screen.getByTestId('textbox').value).toBe(selectedModule.content)
  })
})
