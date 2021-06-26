import React from 'react'
import styles from '../scss/selectIteration.module.scss'
import { ApolloError } from '@apollo/client'
import { Submission, GetPreviousSubmissionsQuery } from '../graphql'

type IterationLink = {
  iteration: number
  current: number
  id: number
  comments: number | undefined
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

const IterationLink: React.FC<IterationLink | { loading: boolean }> = props => {
  if (!props.hasOwnProperty('loading')) {
    props = props as IterationLink
    return (
      <div
        className={`${styles['iteration']} bg-success m-3 text-white ${
          props.current === props.id && styles['active']
        }`}
      >
        <div className={`${styles['iteration__number']} font-weight-bold`}>
          {props.iteration}
        </div>
        {props.comments !== 0 && (
          <div className={`${styles['iteration__comment-count']} d-inline`}>
            {props.comments}
          </div>
        )}
      </div>
    )
  } else
    return (
      <div className={`${styles['iteration']} bg-light m-3 text-muted`}>
        <div className={`${styles['iteration__number']} font-weight-bold`}>
          {0}
        </div>
        <div className={`${styles['iteration__comment-count']} d-inline`}>
          {0}
        </div>
      </div>
    )
}

const SelectCounter: React.FC<
  Pick<SelectIteration, 'data' | 'loading' | 'currentIndex'>
> = ({ data, loading, currentIndex }) => {
  if (loading) return <p className="text-muted mb-0">Iteration n of N total</p>
  if (data)
    return (
      <p className="text-muted mb-0">{`Iteration ${
        currentIndex < 0
          ? data?.getPreviousSubmissions?.length
          : currentIndex + 1
      } of ${
        data?.getPreviousSubmissions && data.getPreviousSubmissions?.length
      }`}</p>
    )
  else return <></>
}

const SelectDisplay: React.FC<Omit<SelectIteration, 'error'>> = ({
  data,
  loading,
  setIndex,
  setSubmission,
  currentId
}) => {
  if (loading) return <IterationLink loading={true} />
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
              />
            </div>
          )
        })}
      </div>
    )
  return <></>
}

export const SelectIteration: React.FC<SelectIteration> = ({
  loading,
  error,
  data,
  setSubmission,
  currentId,
  setIndex,
  currentIndex
}) => {
  return (
    <div className={`card p-1 ${styles['selection__card']}`}>
      <p className={`${styles['selection__title']}`}>
        {loading ? 'Loading previous submissions...' : 'Select submission'}
      </p>
      <SelectCounter
        data={data}
        loading={loading}
        currentIndex={currentIndex}
      />
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
