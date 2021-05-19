import React from 'react'
import CommentBox from '../../components/CommentBox'
import { MockedProvider } from '@apollo/client/testing'
import { Comment } from '../../graphql'
export default {
  component: CommentBox,
  title: 'Components/CommentBox'
}
const comments = [
  {
    content: 'First Comment',
    createdAt: '1620762267819',
    authorId: 3,
    line: 4,
    author: {
      username: 'newbie',
      name: 'Noob Newbie'
    }
  },
  {
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 3,
    line: 4,
    author: {
      username: 'newbie',
      name: 'Noob Newbie'
    }
  },
  {
    content: 'Second Comment',
    createdAt: '1620762275096',
    authorId: 3,
    line: 5,
    author: {
      username: 'admin',
      name: 'Admin Admin'
    }
  }
]

export const Empty: React.FC = () => {
  return (
    <MockedProvider>
      <CommentBox
        line={0}
        fileName="test.js"
        submissionId={0}
        name="user"
        username="User User"
      />
    </MockedProvider>
  )
}

export const WithComments: React.FC = () => {
  return (
    <MockedProvider>
      <CommentBox
        line={4}
        fileName="test.js"
        submissionId={0}
        name="user"
        username="User User"
        commentsData={comments as Comment[]}
      />
    </MockedProvider>
  )
}
