import React, { useContext, useState } from 'react'
import { Comment, Submission } from '../graphql'
import Markdown from 'markdown-to-jsx'
import ReviewerProfile from './ReviewerProfile'
import { Button } from './theme/Button'
import { TrashIcon, PencilIcon } from '@primer/octicons-react'
import styles from '../scss/submissionComments.module.scss'
import { updateCache } from '../helpers/updateCache'
import { useDeleteCommentMutation, useEditCommentMutation } from '../graphql'
import { GlobalContext } from '../helpers/globalContext'
import { MdInput } from './MdInput'
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal'
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from 'react-bootstrap'

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
        <ModalHeader>
          <ModalTitle>Error</ModalTitle>
        </ModalHeader>
        <ModalBody>{modalText}</ModalBody>
        <ModalFooter>
          <Button
            onClick={handleModalClose}
            btnType="info"
            size="sm"
            color="white"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {submissionsComments.map((c, i) => (
        <div
          key={`${c.content}${i}`}
          className="border border-lightgray rounded my-1"
        >
          <div className={'ms-3'}>
            {editing === i ? (
              <div className={styles['text']}>
                <MdInput
                  onChange={setCurrInput}
                  bgColor="white"
                  value={currInput}
                />
              </div>
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
                    btnType="light"
                    color="black"
                    onClick={handleDiscardChange}
                    data-testid="discard-button"
                  >
                    Discard Changes
                  </Button>
                  <span> </span>
                  <Button
                    btnType="info"
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
                    outline
                    btnType="info"
                    size="sm"
                    color="info"
                    onClick={() => {
                      handleStartEditing(i, c.content)
                    }}
                    data-testid="edit-button"
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    outline
                    btnType="danger"
                    size="sm"
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
