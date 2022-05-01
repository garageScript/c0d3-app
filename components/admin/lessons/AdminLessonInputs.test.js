import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminModuleInputs from './AdminModuleInputs'
import { MockedProvider } from '@apollo/client/testing'
import { AddModuleDocument } from '../../../graphql'
import '../../../__mocks__/matchMedia.mock'

// Imported to be able to use .toBeInTheDocument()
import '@testing-library/jest-dom'

const lesson = { title: 'Foundations of JavaScript', id: 1 }
const modules = [
  {
    name: 'Functions',
    content: 'Functions are cool'
  }
]

const basicMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      ...modules[0],
      lessonId: 1
    }
  },
  result: {
    data: {
      addModule: {
        id: 1,
        ...modules[0],
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  }
}

const errorMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      ...modules[0],
      lessonId: 1
    }
  },
  error: new Error('Error')
}

const loadingMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      ...modules[0],
      lessonId: 1
    }
  },
  result: {
    data: {
      addModule: {
        id: 1,
        ...modules[0],
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  },
  // Keep the query at loading state for ~3170 years
  delay: 100_000_000_000_000
}

const mocks = [basicMock]
const errorMocks = [errorMock, { ...errorMock }]
const loadingMocks = [loadingMock]

describe('AdminModuleInputs component', () => {
  it('Should add module', async () => {
    expect.assertions(1)

    const { getByText, getByTestId, container } = render(
      <MockedProvider mocks={mocks}>
        <AdminModuleInputs lessonId={lesson.id} title={lesson.title} />
      </MockedProvider>
    )

    await userEvent.type(getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    await waitFor(() =>
      expect(
        container.querySelector('.octicon-check-circle')
      ).toBeInTheDocument()
    )
  })

  it('Should display error message if inputs are empty', async () => {
    expect.assertions(1)

    const { getByText, getByTestId, container } = render(
      <MockedProvider mocks={mocks}>
        <AdminModuleInputs lessonId={lesson.id} title={lesson.title} />
      </MockedProvider>
    )

    await userEvent.clear(getByTestId('input0'))
    await userEvent.clear(getByTestId('textbox'))

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    await waitFor(() =>
      expect(container.querySelector('.octicon-alert-fill')).toBeInTheDocument()
    )
  })

  it('Should display error message if network or GraphQL error', async () => {
    expect.assertions(1)

    const { getByText, getByTestId, container } = render(
      <MockedProvider mocks={errorMocks}>
        <AdminModuleInputs lessonId={lesson.id} title={lesson.title} />
      </MockedProvider>
    )

    await userEvent.type(getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    await waitFor(() =>
      expect(container.querySelector('.octicon-alert-fill')).toBeInTheDocument()
    )
  })

  it('Should display loading message', async () => {
    expect.assertions(1)

    const { getByText, getByTestId, container } = render(
      <MockedProvider mocks={loadingMocks}>
        <AdminModuleInputs lessonId={lesson.id} title={lesson.title} />
      </MockedProvider>
    )

    await userEvent.type(getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    expect(container.querySelector('.spinner-grow')).toBeInTheDocument()
  })

  it('Should display "Untitled" if no title is provided', async () => {
    expect.assertions(1)

    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <AdminModuleInputs lessonId={lesson.id} title={''} />
      </MockedProvider>
    )

    await userEvent.clear(getByTestId('input0'))

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    expect(getByText('Untitled')).toBeInTheDocument()
  })

  it('Should call onAddModule when a module is added', async () => {
    expect.hasAssertions()

    const onAddModule = jest.fn()

    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <AdminModuleInputs
          lessonId={lesson.id}
          title={lesson.title}
          onAddModule={onAddModule}
        />
      </MockedProvider>
    )

    await userEvent.type(getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    await waitFor(() =>
      expect(onAddModule).toBeCalledWith(basicMock.result.data.addModule, null)
    )
  })

  it('Should call onAddModule when a module is added with null', async () => {
    expect.hasAssertions()

    const onAddModule = jest.fn()

    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={[
          {
            ...basicMock,
            result: {
              ...basicMock.result,
              data: null
            }
          }
        ]}
      >
        <AdminModuleInputs
          lessonId={lesson.id}
          title={lesson.title}
          onAddModule={onAddModule}
        />
      </MockedProvider>
    )

    await userEvent.type(getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })

    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    await waitFor(() => expect(onAddModule).toBeCalledWith(null, null))
  })

  it('Should call onAddModule when there is error', async () => {
    expect.hasAssertions()

    const onAddModule = jest.fn()

    const { getByText, getByTestId } = render(
      <MockedProvider mocks={errorMocks}>
        <AdminModuleInputs
          lessonId={lesson.id}
          title={lesson.title}
          onAddModule={onAddModule}
        />
      </MockedProvider>
    )

    await userEvent.type(getByTestId('input0'), 'Functions', {
      delay: 1
    })
    await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
      delay: 1
    })
    const submit = getByText('ADD MODULE')
    await userEvent.click(submit)

    await waitFor(() =>
      expect(onAddModule).toBeCalledWith(null, { ...modules[0] })
    )
  })
})
