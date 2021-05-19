import React, { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import ReviewerProfile from './ReviewerProfile'
import { MdInput } from './MdInput'
import { Button } from './theme/Button'
import styles from '../scss/commentBox.module.scss'
import GET_APP from '../graphql/queries/getApp'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import { useAddCommentMutation, Comment, User } from '../graphql'
import _ from 'lodash'
type CommentData = Pick<Comment, 'content'> & Pick<User, 'name' | 'username'>

const CommentBox: React.FC<{
  line: number
  fileName: string
  submissionId: number
  commentsData?: Comment[]
  name: string
  username: string
  lessonId?: number
}> = ({
  line,
  fileName,
  submissionId,
  commentsData,
  name,
  username,
  lessonId
}) => {
  const commentData: CommentData[] = []
  commentsData &&
    commentsData.forEach(c => {
      if (c?.line === line) {
        commentData.push({
          name: c.author?.name!,
          username: c.author?.username!,
          content: c.content
        })
      }
    })
  const [comments, setComments] = useState(commentData)
  const [hidden, setHidden] = useState(false)
  const [input, setInput] = useState('')
  const queriesToRefetch = lessonId
    ? {
        query: GET_SUBMISSIONS,
        variables: {
          lessonId
        }
      }
    : { query: GET_APP }
  const [addComment] = useAddCommentMutation({
    refetchQueries: [queriesToRefetch]
  })
  return (
    <>
      <div
        onClick={() => setHidden(!hidden)}
        className={`${styles['showHide']}`}
      >
        {hidden ? 'Show conversation' : 'Hide conversation'}
      </div>
      <div
        className={`${styles['commentBox']} bg-white d-${
          hidden ? 'none' : 'auto'
        }`}
      >
        {comments &&
          comments.map((c, i) => (
            <div key={`${c.content}${i}`} className="border">
              <Markdown wrapper="code_wrapper">{c.content}</Markdown>
              <ReviewerProfile name={c.name} username={c.username} inline />
            </div>
          ))}
        <MdInput onChange={setInput} bgColor="white" />
        <Button
          color="white"
          type="success"
          onClick={() => {
            if (!input) return
            setComments([...comments, { name, username, content: input }])
            addComment({
              variables: {
                line,
                submissionId,
                content: input,
                fileName
              }
            })
            setInput('')
          }}
        >
          Add comment
        </Button>
      </div>
    </>
  )
}

export default CommentBox
