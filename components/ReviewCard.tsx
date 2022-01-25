import { useMutation, ApolloCache } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import dayjs from 'dayjs'
import { GlobalContext } from '../helpers/globalContext'
import relativeTime from 'dayjs/plugin/relativeTime'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'
import {
  Submission,
  useAddCommentMutation,
  useGetPreviousSubmissionsQuery,
  AddCommentMutation,
  SubmissionStatus,
  Comment
} from '../graphql/index'
import { SubmissionComments } from './SubmissionComments'
import _ from 'lodash'
import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { Accordion } from 'react-bootstrap'
import { MdInput } from './MdInput'
import Markdown from 'markdown-to-jsx'
import DiffView from './DiffView'
import { updateCache } from '../helpers/updateCache'
import { SelectIteration } from './SelectIteration'
import Error, { StatusCode } from './Error'
import { ReviewStatus } from './ReviewStatus'
dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: Submission
}

type CommentType = 'accept' | 'reject' | 'comment'

const ReviewButtons: React.FC<{
  commentType: CommentType
  setCommentType: React.Dispatch<React.SetStateAction<CommentType>>
  update: (cache: ApolloCache<AddCommentMutation>) => void
  submissionState: Submission
  commentValue: string
  setCommentValue: React.Dispatch<React.SetStateAction<string>>
  submissionId: number
  lessonId: number
  status: SubmissionStatus
}> = ({
  commentType,
  setCommentType,
  update,
  submissionState,
  commentValue,
  setCommentValue,
  lessonId,
  submissionId,
  status
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

  const acceptRejectButtons = (status: SubmissionStatus) => {
    if (status === SubmissionStatus.Open)
      return (
        <>
          <label>
            <input
              type="radio"
              checked={commentType === 'accept'}
              value="accept"
              onChange={onChange}
              className="me-2"
            />
            <p className="fw-bold d-inline">Accept</p>
            <p className="text-muted">Submit feedback and approve submission</p>
          </label>
          <label>
            <input
              type="radio"
              checked={commentType === 'reject'}
              value="reject"
              onChange={onChange}
              className="me-2"
            />
            <p className="fw-bold d-inline">Reject</p>
            <p className="text-muted">Request changes and reject submission</p>
          </label>
        </>
      )
    return <></>
  }
  return (
    <>
      <div className="d-flex justify-content-between px-2 py-1">
        {acceptRejectButtons(status)}
        <label>
          <input
            type="radio"
            checked={commentType === 'comment'}
            value="comment"
            onChange={onChange}
            className="me-2"
          />
          <p className="fw-bold d-inline">Comment</p>
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
  const { id, diff, user, challenge, lessonId, challengeId, status } =
    submissionData
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
  useEffect(() => {
    if (data?.getPreviousSubmissions) {
      setPreviousSubmissions(data)
      /* istanbul ignore else */
      if (index === -1)
        setSubmission(
          data.getPreviousSubmissions[
            data.getPreviousSubmissions.length - 1
          ] as Submission
        )
      else setSubmission(data.getPreviousSubmissions[index] as Submission)
    }
  }, [data])

  const submissionComments = (comments: Comment[] | undefined | null) => {
    const underComments = comments?.filter(comment => !comment.line)
    if (underComments) {
      return (
        <div className="mt-1">
          <SubmissionComments comments={underComments} />
        </div>
      )
    }
  }
  return (
    <>
      {diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between">
              <div>
                <h4>
                  {user?.username} -{' '}
                  <span className="text-primary">{challenge?.title}</span>
                </h4>
                {submissionState.createdAt && (
                  <Text color="lightgrey" size="sm">
                    <div
                      title={dayjs(parseInt(submissionState.createdAt)).format(
                        'LLL'
                      )}
                    >
                      {dayjs(parseInt(submissionState.createdAt)).fromNow()}
                    </div>
                  </Text>
                )}
              </div>
              <div className="text-end">
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
            </div>
          </div>
          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <Accordion>
                <Accordion.Item eventKey="0" className="bg-white mb-2">
                  <Accordion.Header>Challenge Description</Accordion.Header>
                  <Accordion.Body>
                    <Markdown>{challenge?.description}</Markdown>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <DiffView submission={submissionState} generalStatus={status} />
            </div>
          </div>
          <div className="card-footer bg-white">
            {submissionComments(submissionState?.comments)}
            <ReviewStatus
              name={submissionState.reviewer?.name}
              username={submissionState.reviewer?.username}
              comment={submissionState.comment}
              date={submissionState.updatedAt}
              status={submissionState.status}
            />
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
              status={submissionState.status}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
