import { useMutation } from '@apollo/client'

import React, { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'
import { Submission } from '../graphql/index'

import _ from 'lodash'

import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { MdInput } from './MdInput'
import ReviewerProfile from './ReviewerProfile'
import DiffView from './DiffView'

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
    comments
  } = submissionData
  const [commentValue, setCommentValue] = useState('')
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)

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
            <MdInput onChange={setCommentValue} bgColor={'white'} />
            <Button
              m="1"
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
