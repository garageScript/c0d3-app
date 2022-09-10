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
import Modal from 'react-bootstrap/Modal'

export const SubmissionComments: React.FC<{
  comments: Comment[]
  submission: Submission
}> = ({ comments, submission }) => {
  const [deleteComment] = useDeleteCommentMutation()
  const [editComment] = useEditCommentMutation()
  const [editing, setEditing] = useState<null | number>(null)
  const [currInput, setCurrInput] = useState('')
  const [show, setShow] = useState(false)
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
    if (editing !== null) setShow(true)
    else {
      setEditing(index)
      setCurrInput(initialInput)
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

    setEditing(null)
    setCurrInput('')
  }

  const handleDiscardChange = () => {
    setEditing(null)
    setCurrInput('')
  }

  const handleModalClose = () => {
    setShow(false)
  }

  const modalText =
    'You can only edit one comment in a single comment chain at a time.'

  //to make sure comments load in correct order
  const submissionsComments = _.orderBy(comments, ['id'], ['asc'])

  return (
    <>
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleModalClose}
            type="info"
            size="lg"
            color="white"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {submissionsComments.map((c, i) => (
        <div
          key={`${c.content}${i}`}
          className="border border-lightgray rounded my-1"
        >
          <div className="ms-3">
            {editing === i ? (
              <MdInput
                onChange={setCurrInput}
                bgColor="white"
                value={currInput}
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
                      handleUpdateComment(c, currInput)
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
