import { useMutation, ApolloCache } from '@apollo/client'

import React, { useState, useContext } from 'react'
import Markdown from 'markdown-to-jsx'
import dayjs from 'dayjs'
import { GlobalContext } from '../helpers/globalContext'
import relativeTime from 'dayjs/plugin/relativeTime'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'
import {
  Submission,
  useAddCommentMutation,
  useGetPreviousSubmissionsQuery,
  AddCommentMutation
} from '../graphql/index'
import { SubmissionComments } from './SubmissionComments'
import ReviewerProfile from './ReviewerProfile'
import _ from 'lodash'
import styles from '../scss/reviewCard.module.scss'

import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { MdInput } from './MdInput'
import DiffView from './DiffView'
import { updateCache } from '../helpers/updateCache'
import { useEffect } from 'react'
import { SelectIteration } from './SelectIteration'
import Error, { StatusCode } from './Error'
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

const ReviewButtons: React.FC<{
  commentType: CommentType
  setCommentType: React.Dispatch<React.SetStateAction<CommentType>>
  update: (cache: ApolloCache<AddCommentMutation>) => void
  submissionState: Submission
  commentValue: string
  setCommentValue: React.Dispatch<React.SetStateAction<string>>
  submissionId: number
  lessonId: number
}> = ({
  commentType,
  setCommentType,
  update,
  submissionState,
  commentValue,
  setCommentValue,
  lessonId,
  submissionId
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCommentType(e.target.value as CommentType)
  const [addComment] = useAddCommentMutation()
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)
  const reviewSubmission = (review: any) => async () => {
    await review({
      variables: {
        submissionId: submissionId,
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
            submissionId: submissionState.id,
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
          <p className="text-muted">Submit feedback and approve submission</p>
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
          <p className="text-muted">Request changes and reject submission</p>
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
    </>
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
    challengeId,
    status
  } = submissionData
  const context = useContext(GlobalContext)
  const name = context.session?.user?.name
  const username = context.session?.user?.username
  if (!name || !username) {
    return (
      <Error
        code={StatusCode.INTERNAL_SERVER_ERROR}
        message={'Error while retrieving userinfo from context'}
      />
    )
  }
  const [index, setIndex] = useState(-1)
  const [commentValue, setCommentValue] = useState('')
  const [commentType, setCommentType] = useState<CommentType>('comment')
  const [submissionState, setSubmission] = useState<Submission>(submissionData)
  const { data, loading, error } = useGetPreviousSubmissionsQuery({
    variables: { challengeId, userId: user.id }
  })
  const [previousSubmissions, setPreviousSubmissions] = useState(data)
  const update = updateCache(
    submissionState.id,
    commentValue,
    name,
    username,
    lessonId,
    undefined,
    undefined,
    challengeId,
    user.id
  )
  const underComments = submissionState.comments?.filter(
    comment => !comment.line
  )
  useEffect(() => {
    if (data?.getPreviousSubmissions) {
      setPreviousSubmissions(data)
      /*istanbul ignore else*/
      if (index === -1)
        setSubmission(
          data.getPreviousSubmissions[
            data.getPreviousSubmissions.length - 1
          ] as Submission
        )
      else setSubmission(data.getPreviousSubmissions[index] as Submission)
    }
  }, [submissionData, data])
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
            <SelectIteration
              data={previousSubmissions}
              loading={loading}
              error={error}
              setSubmission={setSubmission}
              currentId={submissionState.id}
              setIndex={setIndex}
              currentIndex={index}
            />
          </div>
          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <DiffView submission={submissionState} generalStatus={status} />
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
            <ReviewButtons
              commentType={commentType}
              setCommentType={setCommentType}
              update={update}
              submissionState={submissionState}
              commentValue={commentValue}
              setCommentValue={setCommentValue}
              lessonId={lessonId}
              submissionId={id}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
