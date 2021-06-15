import React from 'react'
import { Comment } from '../graphql'
import Markdown from 'markdown-to-jsx'
import ReviewerProfile from './ReviewerProfile'
export const SubmissionComments: React.FC<{
  comments: Comment[]
}> = ({ comments }) => {
  return (
    <>
      {comments.map((c, i) => (
        <div key={`${c.content}${i}`} className="border border-lightgray">
          <div className="ml-3">
            <Markdown wrapper="code_wrapper">{c.content}</Markdown>
          </div>
          <ReviewerProfile
            name={c.author!.name}
            username={c.author!.username}
            inline
          />
        </div>
      ))}
    </>
  )
}
