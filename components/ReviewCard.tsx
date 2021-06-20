import { useMutation } from '@apollo/client'

import React, { useState, useContext } from 'react'
import Markdown from 'markdown-to-jsx'
import dayjs from 'dayjs'
import { GlobalContext } from '../helpers/globalContext'
import relativeTime from 'dayjs/plugin/relativeTime'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'
import { Submission, useAddCommentMutation } from '../graphql/index'
import { SubmissionComments } from './SubmissionComments'
import ReviewerProfile from './ReviewerProfile'
import _ from 'lodash'
import styles from '../scss/reviewCard.module.scss'

import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { MdInput } from './MdInput'
import DiffView from './DiffView'
import { updateCache } from '../helpers/updateCache'
dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: Submission
}

type CommentType = 'accept' | 'reject' | 'comment'

const RequestChanges: React.FC<{
  username: string
  name: string
  comment: string
  date: string
}> = ({ name, username, comment, date }) => {
  return (
    <div className={`${styles.changes} px-2 py-1`}>
      <div className="d-flex align-items-center">
        <img src="/assets/requestChanges.svg" className={styles.icon} />
        <ReviewerProfile name={name} username={username} />
        <div className={`${styles.font} ml-2`}>
          requested changes on{' '}
          {dayjs(Number.parseInt(date)).format('dddd, MMMM D, YYYY')}:
        </div>
      </div>
      <hr />
      <Markdown>{comment}</Markdown>
    </div>
  )
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const {
    id,
    diff,
    comment,
    updatedAt,
    user,
    challenge,
    lessonId,
    reviewer,
    comments,
    status
  } = submissionData
  const [commentValue, setCommentValue] = useState('')
  const [commentType, setCommentType] = useState<CommentType>('comment')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCommentType(e.target.value as CommentType)
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)
  const [addComment] = useAddCommentMutation()
  const context = useContext(GlobalContext)
  const name = context.session?.user?.name
  const username = context.session?.user?.username
  const update = updateCache(id, commentValue, name!, username!, lessonId)
  const underComments = comments?.filter(comment => !comment.line)

  const reviewSubmission = (review: any) => async () => {
    await review({
      variables: {
        submissionId: id,
        lessonId,
        comment: commentValue
      }
    })
  }

  const submitReview = () => {
    switch (commentType) {
      case 'comment': {
        addComment({
          variables: {
            submissionId: id,
            content: commentValue
          },
          update
        })
        setCommentValue('')
        return
      }
      case 'accept': {
        reviewSubmission(accept)()
        return
      }
      case 'reject': {
        reviewSubmission(reject)()
      }
    }
  }
  return (
    <>
      {diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">
            <h4>
              {user?.username} -{' '}
              <span className="text-primary">{challenge?.title}</span>
            </h4>
            <Text color="lightgrey" size="sm">
              {dayjs(parseInt(updatedAt || '0')).fromNow()}
            </Text>
          </div>

          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <DiffView
                diff={diff}
                id={id}
                comments={comments}
                lessonId={lessonId}
                status={status}
              />
            </div>
          </div>

          <div className="card-footer bg-white">
            {comment && (
              <RequestChanges
                name={reviewer?.name!}
                username={reviewer?.username!}
                comment={comment}
                date={updatedAt}
              />
            )}
            {underComments && (
              <div className="mt-1">
                <SubmissionComments comments={underComments} />
              </div>
            )}
            <MdInput
              onChange={setCommentValue}
              bgColor={'white'}
              value={commentValue}
            />
            <div className="d-flex justify-content-between px-2 py-1">
              <label>
                <input
                  type="radio"
                  checked={commentType === 'accept'}
                  value="accept"
                  onChange={onChange}
                  className="mr-2"
                />
                <p className="font-weight-bold d-inline">Accept</p>
                <p className="text-muted">
                  Submit feedback and approve submission
                </p>
              </label>
              <label>
                <input
                  type="radio"
                  checked={commentType === 'reject'}
                  value="reject"
                  onChange={onChange}
                  className="mr-2"
                />
                <p className="font-weight-bold d-inline">Reject</p>
                <p className="text-muted">
                  Request changes and reject submission
                </p>
              </label>
              <label>
                <input
                  type="radio"
                  checked={commentType === 'comment'}
                  value="comment"
                  onChange={onChange}
                  className="mr-2"
                />
                <p className="font-weight-bold d-inline">Comment</p>
                <p className="text-muted">
                  Submit general feedback without explicit approval
                </p>
              </label>
            </div>
            <Button type="success" color="white" onClick={() => submitReview()}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
