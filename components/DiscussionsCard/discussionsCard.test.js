import React from 'react'
import DiscussionsCard from './DiscussionsCard'
import { waitFor, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

const mockDiscussionCard = {
  isMain: true,
  username: 'user01',
  userPic:
    'https://ssb.wiki.gallery/images/thumb/6/61/Ryu_SSBU.png/1200px-Ryu_SSBU.png',
  timeStamp: 'September 22, 2022 @ 3:00 UTC',
  content:
    'dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit: dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:. Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:Lorem ipsum, dark mode will be a good feature to implement , if i will get time from exams , i will try for sure :shipit:',
  likes: 9,
  dislikes: 2,
  deleteClick: () => {}
}

describe('Testing DiscussionCard Component', () => {
  it('Should open reply input box and buttons when user hits reply', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider>
        <DiscussionsCard {...mockDiscussionCard} />
      </MockedProvider>
    )

    await userEvent.click(getByTestId('reply'))
    const sendButton = getByText('Send')
    expect(getByTestId('cancel_reply')).toBeInTheDocument()
    await userEvent.click(getByTestId('cancel_reply'))

    waitFor(() => {
      expect(sendButton).toBeFalsy()
    })
  })

  it('Should open an input text editor when user hits pencil/edit', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider>
        <DiscussionsCard {...mockDiscussionCard} />
      </MockedProvider>
    )

    await userEvent.click(getByTestId('pencil'))

    waitFor(() => {
      expect(getByTestId('cancel_edit')).toBeInTheDocument()
      expect(getByText('Reply')).toBeFalsy()
    })

    await userEvent.click(getByTestId('cancel_edit'))

    waitFor(() => {
      expect(getByTestId('pencil')).toBeInTheDocument()
      expect(getByText('Save')).toBeFalsy()
    })
  })
})
