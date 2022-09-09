import React, { useContext, useState } from 'react'
import { Comment, Submission } from '../graphql'
import Markdown from 'markdown-to-jsx'
import ReviewerProfile from './ReviewerProfile'
import { Button } from './theme/Button'
import { TrashIcon } from '@primer/octicons-react'
import styles from '../scss/submissionComments.module.scss'
import { updateCache } from '../helpers/updateCache'
import { useDeleteCommentMutation, useEditCommentMutation } from '../graphql'
import { GlobalContext } from '../helpers/globalContext'
import { MdInput } from './MdInput'
import _ from 'lodash'

export const SubmissionComments: React.FC<{
  comments: Comment[]
  submission: Submission
}> = ({ comments, submission }) => {
  const [deleteComment] = useDeleteCommentMutation()
  const [editComment] = useEditCommentMutation()
  const [editing, setEditing] = useState<undefined | number>()
  const [curInput, setCurInput] = useState('')
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

  const handleStartEditing = (index: number, initialInput: string) => {
    if (editing !== undefined)
      alert(
        'You can only edit one comment in a single comment chain at a time.'
      )
    else {
      setEditing(index)
      setCurInput(initialInput)
    }
  }

  const handleUpdateComment = async (c: Comment, newContent: string) => {
    const update = updateCache({
      submissionId: submission.id,
      content: newContent,
      lessonId: submission.lessonId,
      challengeId: submission.challengeId,
      userId: submission.user.id
    })

    await editComment({
      variables: {
        id: c.id,
        content: newContent
      },
      update
    })

    setEditing(undefined)
    setCurInput('')
  }

  const handleDiscardChange = () => {
    setEditing(undefined)
    setCurInput('')
  }

  //to make sure comments load in correct order
  comments = _.orderBy(comments, ['id'], ['asc'])

  return (
    <>
      {comments.map((c, i) => (
        <div
          key={`${c.content}${i}`}
          className="border border-lightgray rounded my-1"
        >
          <div className="ms-3">
            {editing === i ? (
              <MdInput
                onChange={setCurInput}
                bgColor="white"
                value={curInput}
              />
            ) : (
              <Markdown wrapper="code_wrapper">{c.content}</Markdown>
            )}
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
              editing === i ? (
                <div>
                  <Button
                    type="light"
                    color="black"
                    onClick={() => {
                      handleDiscardChange()
                    }}
                    data-testid="discard-button"
                  >
                    Discard Changes
                  </Button>
                  <span> </span>
                  <Button
                    type="info"
                    color="white"
                    onClick={() => {
                      handleUpdateComment(c, curInput)
                    }}
                    data-testid="save-button"
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    type="info"
                    size="sm"
                    color="white"
                    onClick={() => {
                      handleStartEditing(i, c.content)
                    }}
                    data-testid="edit-button"
                  >
                    Edit
                  </Button>
                  <Button
                    outline
                    type="danger"
                    color="danger"
                    onClick={() => handleDeleteComment(c)}
                    data-testid="delete-button"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
