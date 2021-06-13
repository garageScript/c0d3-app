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
import _ from 'lodash'

import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { MdInput } from './MdInput'
import ReviewerProfile from './ReviewerProfile'
import DiffView from './DiffView'
import { updateCache } from '../helpers/updateCache'
dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: Submission
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
              <div>
                <Markdown>{comment}</Markdown>
                <ReviewerProfile
                  username={reviewer?.username}
                  name={reviewer?.name}
                />
              </div>
            )}
            {underComments && <SubmissionComments comments={underComments} />}
            <MdInput
              onChange={setCommentValue}
              bgColor={'white'}
              value={commentValue}
            />
            <div className="mr-5 d-inline">
              <Button
                m="1"
                type="info"
                color="white"
                onClick={() => {
                  addComment({
                    variables: {
                      submissionId: id,
                      content: commentValue
                    },
                    update
                  })
                  setCommentValue('')
                }}
              >
                Comment
              </Button>
            </div>
            <Button
              type="success"
              color="white"
              onClick={reviewSubmission(accept)}
            >
              Accept
            </Button>

            <Button
              m="1"
              type="danger"
              color="white"
              onClick={reviewSubmission(reject)}
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
