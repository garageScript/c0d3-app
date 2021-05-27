import React, { useState, useContext } from 'react'
import Markdown from 'markdown-to-jsx'
import { ApolloCache } from '@apollo/client'
import ReviewerProfile from './ReviewerProfile'
import { MdInput } from './MdInput'
import { Button } from './theme/Button'
import styles from '../scss/commentBox.module.scss'
import GET_APP from '../graphql/queries/getApp'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import {
  useAddCommentMutation,
  Comment,
  User,
  AddCommentMutation,
  GetAppQuery,
  SubmissionsQuery,
  Submission
} from '../graphql'
import _ from 'lodash'
import { GlobalContext } from '../helpers/globalContext'
type CommentData = Pick<Comment, 'content'> & Pick<User, 'name' | 'username'>
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

const CommentBox: React.FC<{
  line: number
  fileName: string
  submissionId: number
  commentsData?: Comment[]
  lessonId?: number
  status?: string
}> = ({ line, fileName, submissionId, commentsData, lessonId, status }) => {
  const commentData: CommentData[] = []
  const context = useContext(GlobalContext)
  const name = context?.session?.user?.name
  const username = context?.session?.user?.username
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
  const [comments] = useState(commentData)
  const [hidden, setHidden] = useState(status === 'passed')
  const [input, setInput] = useState('')
  /*
  update function modifies client cache after mutation
  lessonId prop is used to differentiate between student and reviewer 
  student data comes from GetApp query while reviewer uses getSubmission query
  */
  const update = (cache: ApolloCache<AddCommentMutation>) => {
    if (lessonId) {
      const data = cache.readQuery<SubmissionsQuery>({
        query: GET_SUBMISSIONS,
        variables: { lessonId }
      })
      const current = data!.submissions?.filter(s => s!.id === submissionId)
      const copy = _.cloneDeep(current) as RecursivePartial<Submission>[]
      copy[0]!.comments!.push({
        content: input,
        fileName,
        line,
        submissionId,
        author: {
          name,
          username
        }
      })
      const newData = data!.submissions!.map(s => {
        if (s!.id === submissionId) return copy[0]
        return s
      })
      cache.writeQuery({
        query: GET_SUBMISSIONS,
        variables: { lessonId },
        data: { ...data, submissions: newData }
      })
    } else {
      const data = cache.readQuery<GetAppQuery>({
        query: GET_APP
      })
      const current = data!.session!.submissions!.filter(
        s => s!.id === submissionId
      )
      const copy = _.cloneDeep(current) as RecursivePartial<Submission>[]
      copy[0]!.comments!.push({
        content: input,
        fileName,
        line,
        submissionId,
        author: {
          name,
          username
        }
      })
      const newData = {
        ...data,
        session: { ...data!.session, submissions: copy }
      }
      cache.writeQuery({
        query: GET_APP,
        data: newData
      })
    }
  }
  const [addComment] = useAddCommentMutation()
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
        {status !== 'passed' && (
          <>
            <MdInput onChange={setInput} bgColor="white" />
            <Button
              color="white"
              type="success"
              onClick={() => {
                if (!input) return
                addComment({
                  variables: {
                    line,
                    submissionId,
                    content: input,
                    fileName
                  },
                  update
                })
                setInput('')
              }}
            >
              Add comment
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default CommentBox
