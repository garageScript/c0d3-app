import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import GiveStarCard from './GiveStarCard'
import { MockedProvider } from '@apollo/client/testing'
import SET_STAR from '../../graphql/queries/setStar'
import GET_LESSON_MENTORS from '../../graphql/queries/getLessonMentors'
import lessonMentorsData from '../../__dummy__/getLessonMentorsData'
const mockSetStarMutatation = {
  request: {
    query: SET_STAR,
    variables: { mentorId: 4, lessonId: 4, comment: '1' }
  },
  result: {
    data: { setStar: { success: true } }
  }
}
const mockGetLessonMentors = {
  request: { query: GET_LESSON_MENTORS, variables: { lessonId: 4 } },
  result: {
    data: { getLessonMentors: lessonMentorsData }
  }
}

const clickOnMentor = getByRole => {
  const mentor = getByRole('heading', { name: 'bob bafet' })
  fireEvent.mouseOver(mentor)
  expect(document.body).toMatchSnapshot()
  fireEvent.click(mentor)
  expect(document.body).toMatchSnapshot()
}

const giveComment = getByRole => {
  const commentBox = getByRole('textbox')
  fireEvent.change(commentBox, { target: { value: '1' } })
}

const giveStar = getByRole => fireEvent.click(getByRole('button'))

describe('GiveStarCard Component', () => {
  let mockProps
  beforeEach(() => {
    mockProps = {
      show: true,
      close: jest.fn(),
      setStarGiven: jest.fn(),
      lessonId: 4,
      starGiven: 'flimmy flam jam'
    }
  })

  test('should display nothing when show prop is false', async () => {
    mockProps.show = false
    render(<GiveStarCard {...mockProps} />)
    expect(GiveStarCard(mockProps)).toBeNull()
    expect(document.body).toMatchSnapshot()
  })

  test('should display `already given star to` display when starGiven prop does not equal empty string', async () => {
    const { getByText } = render(<GiveStarCard {...mockProps} />)
    await waitFor(() => getByText('You have already given a star to'))
    expect(document.body).toMatchSnapshot()
  })

  test('should successfully search for and give mentor a Star', async () => {
    mockProps.starGiven = ''
    const mocks = [mockSetStarMutatation, mockGetLessonMentors]
    const { getByRole, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GiveStarCard {...mockProps} />
      </MockedProvider>
    )
    await waitFor(() => getByText('Who helped you the most?'))
    expect(document.body).toMatchSnapshot()

    // search in searchbar
    const searchMentorInput = getByTestId('giveStarInput')
    fireEvent.change(searchMentorInput, {
      target: { value: 'bob bafet' }
    })
    expect(searchMentorInput.value).toContain('bob bafet')
    expect(document.body).toMatchSnapshot()

    clickOnMentor(getByRole)

    // click on back button after getting to `giving a star to` display
    const backButton = getByTestId('backButton')
    fireEvent.click(backButton)
    expect(document.body).toMatchSnapshot()

    clickOnMentor(getByRole)
    expect(document.body).toMatchSnapshot()

    giveComment(getByRole)
    expect(document.body).toMatchSnapshot()

    // `thanks` display shows if there is no error after pressing Give Star button
    giveStar(getByRole)
    await waitFor(() =>
      getByRole('heading', { name: 'Thanks for letting us know!' })
    )
    expect(document.body).toMatchSnapshot()

    // check if setStarGiven function is called
    const exitBtn = getByRole('button')
    fireEvent.click(exitBtn)
    expect(mockProps.setStarGiven).toBeCalledWith('bob')
  })

  test('should display error message when giving a star fails', async () => {
    mockProps.starGiven = ''
    const setStarError = { ...mockSetStarMutatation }
    delete setStarError.result
    setStarError.error = new Error()
    const mocks = [mockGetLessonMentors, setStarError]
    const { getByRole, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GiveStarCard {...mockProps} />
      </MockedProvider>
    )
    await waitFor(() => getByText('Who helped you the most?'))
    expect(document.body).toMatchSnapshot()

    clickOnMentor(getByRole)
    giveComment(getByRole)
    giveStar(getByRole)
    await waitFor(() =>
      getByRole('heading', { name: 'Error sending star, please try again' })
    )
    expect(document.body).toMatchSnapshot()
  })
})
