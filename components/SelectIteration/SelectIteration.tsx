import React from 'react'
import styles from './selectIteration.module.scss'
import { ApolloError } from '@apollo/client'
import {
  Submission,
  GetPreviousSubmissionsQuery,
  SubmissionStatus
} from '../../graphql'
import { Badge, Button } from 'react-bootstrap'

type IterationLink = {
  iteration: number
  current: number
  id: number
  comments: number | undefined
  status: SubmissionStatus
  loading?: boolean
}

type SelectIteration = {
  loading: boolean
  error: ApolloError | undefined
  data: GetPreviousSubmissionsQuery | undefined
  setSubmission: React.Dispatch<React.SetStateAction<Submission>>
  currentId: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  currentIndex: number
}

const statusToBtnVariant = {
  [SubmissionStatus.Overwritten]: 'info',
  [SubmissionStatus.Open]: 'warning',
  [SubmissionStatus.NeedMoreWork]: 'danger',
  [SubmissionStatus.Passed]: 'success'
}

const IterationLink: React.FC<IterationLink | { loading: boolean }> = props => {
  if (props.loading)
    return (
      <Button
        variant="light"
        className={`${styles['button']} ${styles['loading']}`}
      />
    )

  props = props as IterationLink
  const isSelected = props.current === props.id
  return (
    <Button
      variant={`outline-${statusToBtnVariant[props.status]}`}
      className={`${styles['button']} ${
        isSelected ? styles['active'] : ''
      } m-2`}
      active={isSelected}
    >
      {props.iteration}
      {props.comments !== 0 && (
        <Badge className={`${styles['badge']} bg-light`}>
          {props.comments}
        </Badge>
      )}
      <span className="visually-hidden">comment count</span>
    </Button>
  )
}

const SelectDisplay: React.FC<Omit<SelectIteration, 'error'>> = ({
  data,
  loading,
  setIndex,
  setSubmission,
  currentId
}) => {
  if (loading) return <IterationLink loading />
  if (data?.getPreviousSubmissions)
    return (
      <div>
        {data.getPreviousSubmissions.map((submission, i) => {
          return (
            <div
              onClick={() => {
                setSubmission(submission as Submission)
                setIndex(i)
              }}
              key={submission.id}
              className="d-inline"
              data-testid={`iteration ${i}`}
            >
              <IterationLink
                iteration={i + 1}
                current={currentId}
                id={submission.id}
                comments={submission.comments?.length}
                status={submission.status}
              />
            </div>
          )
        })}
      </div>
    )
  return <></>
}

const SelectIteration: React.FC<SelectIteration> = ({
  loading,
  error,
  data,
  setSubmission,
  currentId,
  setIndex,
  currentIndex
}) => {
  return (
    <div className={`${styles['selection__card']}`}>
      <p className={`${styles['selection__title']} text-muted mx-2`}>
        {loading ? 'Loading previous submissions...' : 'Select submission'}
      </p>
      {error && (
        <>
          <p>{`Error while fetching previous submissions:`}</p>
          <p>{error.message}</p>
        </>
      )}
      <SelectDisplay
        data={data}
        loading={loading}
        currentIndex={currentIndex}
        currentId={currentId}
        setIndex={setIndex}
        setSubmission={setSubmission}
      />
    </div>
  )
}

export default SelectIteration
