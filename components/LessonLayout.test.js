import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Layout from './LessonLayout'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../graphql/queries/getApp'
import dummySessionData from '../__dummy__/sessionData'
import lessonData from '../__dummy__/lessonData'
import '@testing-library/jest-dom'
import LessonCard from './LessonCard'
import { useRouter } from 'next/router'

describe('Layout component', () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: dummySessionData,
          lessons: [],
          alerts: []
        }
      }
    }
  ]
  const window = global.window
  beforeEach(() => {
    global.window = window
    jest.clearAllMocks()
  })
  test('Should render "Go back" button on simple documents', async () => {
    const { back } = useRouter()
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout />
      </MockedProvider>
    )
    expect(screen.getByText('Go Back')).toBeVisible()
    fireEvent.click(screen.getByText('Go Back'))
    expect(back).toBeCalled()
  })
  test('Should render lesson component in lesson title is provided', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          title="Test title"
          isPassed={true}
        />
      </MockedProvider>
    )
    expect(screen.getAllByText('Test title')[0]).toBeVisible()
  })
  test('Should scroll to the top when arrow is clicked', async () => {
    const scroll = jest.fn()
    global.window.scrollTo = scroll
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
        ></Layout>
      </MockedProvider>
    )
    fireEvent.click(screen.getByTestId('arrow'))
    expect(scroll).toBeCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })
  test('Should show arrow after scroll', async () => {
    //supressing updating unmounted component warning
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => {})
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
        >
          {lessonData.map(lesson => {
            return <LessonCard {...lesson} key={lesson.title} />
          })}
        </Layout>
      </MockedProvider>
    )
    fireEvent.scroll(window, { target: { scrollY: 1001, innerHeight: -500 } })
    expect(screen.getByTestId('arrow')).toBeVisible()
  })
  test('Should render subtitles when passed', async () => {
    jest
      .spyOn(require('next/router'), 'useRouter')
      .mockImplementationOnce(() => ({
        pathname: 'foobar/primitive_data_and_operators'
      }))

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
          subLessons={[
            'Primitive data and operators',
            'Functions and execution context'
          ]}
        />
      </MockedProvider>
    )
    expect(
      screen.getByText('Part 1: Primitive data and operators')
    ).toBeVisible()
  })
  test('Should render previous part link', async () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: 'foobar/functions_and_execution_context',
      asPath: ''
    }))

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
          subLessons={[
            'Primitive data and operators',
            'Functions and execution context'
          ]}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Previous part:')).toBeVisible()
    expect(screen.queryByText('Next part:')).toBeNull()
  })
  test('Should render next part link', async () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: 'foobar/primitive_data_and_operators',
      asPath: ''
    }))

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
          subLessons={[
            'Primitive data and operators',
            'Functions and execution context'
          ]}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Next part:')).toBeVisible()
    expect(screen.queryByText('Previous part:')).toBeNull()
  })
  test('Should render next and previous part links', async () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: 'foobar/middle_part',
      asPath: ''
    }))

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Layout
          lessonCoverUrl="test"
          lessonId="1"
          lessonTitle="Test title"
          isPassed={true}
          subLessons={[
            'Primitive data and operators',
            'Middle part',
            'Functions and execution context'
          ]}
        />
      </MockedProvider>
    )
    expect(screen.getByText('Previous part:')).toBeVisible()
    expect(screen.getByText('Next part:')).toBeVisible()
  })
})
