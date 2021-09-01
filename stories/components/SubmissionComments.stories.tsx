import React from 'react'
import { SubmissionComments } from '../../components/SubmissionComments'

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
    authorId: 3,
    line: 4,
    author: {
      id: 2,
      email: 'somemail@.com',
      isAdmin: false,
      username: 'newbie',
      name: 'Noob Newbie',
      discordUsername: '',
      discordAvatarUrl: ''
    }
  },
  {
    id: 1,
    submissionId: 1,
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 3,
    line: 4,
    author: {
      id: 2,
      email: 'somemail@.com',
      isAdmin: false,
      username: 'newbie',
      name: 'Noob Newbie',
      discordUsername: '',
      discordAvatarUrl: ''
    }
  },
  {
    id: 1,
    submissionId: 1,
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 3,
    line: 5,
    author: {
      id: 1,
      email: 'somemail@.com',
      isAdmin: true,
      username: 'admin',
      name: 'Admin Admin',
      discordUsername: '',
      discordAvatarUrl: ''
    }
  }
]
export const WithComments: React.FC = () => {
  return <SubmissionComments comments={comments} />
}
