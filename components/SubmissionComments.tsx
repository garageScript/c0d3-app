import React, { useContext } from 'react'
import { Comment, Submission } from '../graphql'
import Markdown from 'markdown-to-jsx'
import ReviewerProfile from './ReviewerProfile'
import { Button } from './theme/Button'
import { TrashIcon } from '@primer/octicons-react'
import styles from '../scss/submissionComments.module.scss'
import { updateCache } from '../helpers/updateCache'
import { useDeleteCommentMutation } from '../graphql'
import { GlobalContext } from '../helpers/globalContext'

export const SubmissionComments: React.FC<{
  comments: Comment[]
  submission: Submission
}> = ({ comments, submission }) => {
  const [deleteComment] = useDeleteCommentMutation()
  const context = useContext(GlobalContext)
  const id = context.session?.user?.id

  const handleDeleteComment = (c: Comment) => {
    const update = updateCache({
      submissionId: submission.id,
      commentToDeleteId: c.id,
      lessonId: submission.lessonId,
      challengeId: submission.challengeId,
      userId: submission.user.id
    })

    deleteComment({
      variables: {
        id: c.id
      },
      update
    })
  }

  return (
    <>
      {comments.map((c, i) => (
        <div
          key={`${c.content}${i}`}
          className="border border-lightgray rounded my-1"
        >
          <div className="ms-3">
            <Markdown wrapper="code_wrapper">{c.content}</Markdown>
          </div>
          <div
            className={`${styles['wrapper']} d-flex justify-content-between align-items-center p-1`}
          >
            <ReviewerProfile
              name={c.author!.name}
              username={c.author!.username}
              inline
            />
            {id === c.authorId ? (
              <div>
                <Button
                  outline
                  type="danger"
                  color="danger"
                  onClick={() => handleDeleteComment(c)}
                >
                  <TrashIcon />
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
