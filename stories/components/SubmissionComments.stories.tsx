import React from 'react'
import SubmissionComments from '../../components/SubmissionComments'
import { Submission } from '../../graphql'
import submissionData from '../../__dummy__/submission'
import { MockedProvider } from '@apollo/client/testing'

export default {
  component: SubmissionComments,
  title: 'Components/SubmissionComments'
}
const comments = [
  {
    id: 1,
    submissionId: 1,
    content: 'First Comment',
    createdAt: '1620762267819',
    authorId: 1,
    line: 4,
    author: {
      id: 2,
      email: 'somemail@.com',
      isAdmin: false,
      username: 'newbie',
      name: 'Noob Newbie',
      discordUserId: '',
      discordUsername: '',
      discordAvatarUrl: '',
      isConnectedToDiscord: false
    }
  },
  {
    id: 1,
    submissionId: 1,
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 1,
    line: 4,
    author: {
      id: 2,
      email: 'somemail@.com',
      isAdmin: false,
      username: 'newbie',
      name: 'Noob Newbie',
      discordUserId: '',
      discordUsername: '',
      discordAvatarUrl: '',
      isConnectedToDiscord: false
    }
  },
  {
    id: 1,
    submissionId: 1,
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 1,
    line: 5,
    author: {
      id: 1,
      email: 'somemail@.com',
      isAdmin: true,
      username: 'admin',
      name: 'Admin Admin',
      discordUserId: '',
      discordUsername: '',
      discordAvatarUrl: '',
      isConnectedToDiscord: false
    }
  }
]

export const WithComments: React.FC = () => (
  <MockedProvider>
    <SubmissionComments
      comments={comments}
      submission={submissionData as unknown as Submission}
    />
  </MockedProvider>
)
