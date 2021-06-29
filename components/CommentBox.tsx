import React, { useState, useContext } from 'react'
import { MdInput } from './MdInput'
import { Button } from './theme/Button'
import styles from '../scss/commentBox.module.scss'
import { useAddCommentMutation, Comment, SubmissionStatus } from '../graphql'
import _ from 'lodash'
import { GlobalContext } from '../helpers/globalContext'
import { updateCache } from '../helpers/updateCache'
import { SubmissionComments } from './SubmissionComments'

const CommentBox: React.FC<{
  line: number
  fileName: string
  submissionId: number
  commentsData?: Comment[]
  lessonId?: number
  status?: string
  challengeId?: number
  userId?: number
}> = ({
  line,
  fileName,
  submissionId,
  commentsData,
  lessonId,
  challengeId,
  userId
}) => {
  const context = useContext(GlobalContext)
  const name = context.session?.user?.name
  const username = context.session?.user?.username
  const showComments = true
  const comments = commentsData?.filter(comment => comment.line === line)
  const [hidden, setHidden] = useState(false)
  const [input, setInput] = useState('')
  const update = updateCache(
    submissionId,
    input,
    name!,
    username!,
    lessonId,
    line,
    fileName,
    challengeId,
    userId
  )

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
        {comments && <SubmissionComments comments={comments} />}
        {showComments && (
          <>
            <MdInput onChange={setInput} bgColor="white" value={input} />
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
