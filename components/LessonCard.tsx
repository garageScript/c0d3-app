import { useQuery } from '@apollo/client'
import React from 'react'
import { CheckCircle } from 'react-feather'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import {
  Props,
  ReviewButtonProps,
  ReviewCountProps
} from '../@types/lessonCard'
import NavLink from './NavLink'
import Image from 'next/image'
import styles from '../scss/lessonCard.module.scss'
import { SubmissionStatus } from '../graphql'

const ReviewCount: React.FC<ReviewCountProps> = props => {
  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: { lessonId: props.lessonId },
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return (
      <div className="spinner-border spinner-border-sm mx-1" role="status" />
    )
  }

  if (!data) {
    return <span>0</span>
  }
  const pendingSubmissionsCount = data.submissions.reduce(
    (acc: number, val: any) => {
      if (val.status === SubmissionStatus.Open) {
        acc = acc + 1
        return acc
      }
      return acc
    },
    0
  )

  return <span>{pendingSubmissionsCount}</span>
}

const ReviewButton: React.FC<ReviewButtonProps> = props => {
  let style = 'btn btn-sm bg-primary text-white float-right mb-2 mr-2'
  if (props.style) style += props.style
  if (!props.isCompleted) {
    return null
  }
  return (
    <a href={props.reviewUrl} className={style}>
      Review <ReviewCount lessonId={props.lessonId} /> Submissions
    </a>
  )
}

const LessonCard: React.FC<Props> = props => {
  const containerClass =
    props.currentState === 'inProgress'
      ? `${styles['lesson-card__container_inprogress']} border-primary`
      : 'border-0'
  const mobile = (
    <>
      <h4 className={`${styles['lesson-card__title']} font-weight-bold mt-3 `}>
        <div className="d-flex justify-content-center">
          <div className="align-self-center">
            <NavLink
              as={`/curriculum/${props.lessonId}`}
              path="/curriculum/[lesson]"
            >
              {props.title}
            </NavLink>
          </div>
          {props.currentState === 'completed' && (
            <span
              className={`${styles['lesson-card__badge']} badge badge-pill badge-success p-0`}
            >
              <CheckCircle size="15" />
              <span className="mx-1 d-none d-md-block">COMPLETED</span>
            </span>
          )}
        </div>
      </h4>
      <Image
        src={`/assets/curriculum/${props.coverImg}`}
        alt={props.coverImg}
        className="rounded"
        objectFit="cover"
        layout="intrinsic"
        width="116"
        height="165"
      />
      <div>
        <div className="d-inline-block mt-3">
          <img
            className="mr-2"
            src="/assets/curriculum/icons/icon-challenge.svg"
            alt="icon-challenge"
          />
          <span className={`${styles['lesson-card__icon-text']}`}>
            {props.challengeCount} CHALLENGES
          </span>
        </div>
      </div>
      <p className="mt-2">{props.description}</p>
      <ReviewButton
        isCompleted={props.currentState === 'completed'}
        reviewUrl={props.reviewUrl}
        lessonId={props.lessonId}
        style="mr-0"
      />
    </>
  )

  const tabletAndDesktop = (
    <>
      <Image
        src={`/assets/curriculum/${props.coverImg}`}
        alt={props.coverImg}
        className="align-self-center"
        width="116"
        height="165"
        objectFit="contain"
      />

      <div
        className={`${styles['lesson-card__description']} pl-4 d-none d-sm-block`}
      >
        <div className="d-flex">
          <h4
            className={`${styles['lesson-card__title']} font-weight-bold mt-3`}
          >
            <NavLink
              as={`/curriculum/${props.lessonId}`}
              path="/curriculum/[lesson]"
            >
              {props.title}
            </NavLink>
          </h4>
          {props.currentState === 'completed' && (
            <span
              className={`${styles['lesson-card__badge']} badge badge-pill badge-success mt-2 mr-2 ml-auto py-2 d-flex align-items-center`}
            >
              <CheckCircle size="15" />
              <span className="mx-1 d-none d-md-block">COMPLETED</span>
            </span>
          )}
        </div>
        <div>
          <div>
            <div className="d-inline-block mr-4">
              <img
                className="mr-2"
                src="/assets/curriculum/icons/icon-challenge.svg"
                alt="icon-challenge"
              />
              <span className={`${styles['lesson-card__icon-text']}`}>
                {props.challengeCount} CHALLENGES
              </span>
            </div>
          </div>
          <p className="mt-2">{props.description}</p>
        </div>
        <ReviewButton
          isCompleted={props.currentState === 'completed'}
          reviewUrl={props.reviewUrl}
          lessonId={props.lessonId}
        />
      </div>
    </>
  )
  return (
    <div className={`card shadow-sm mt-3 ${containerClass}`}>
      <div className="d-flex d-sm-none flex-column px-3">{mobile}</div>
      <div className="d-none d-sm-flex p-2">{tabletAndDesktop}</div>
      {props.currentState === 'inProgress' && (
        <div className="p-2 bg-primary">
          <NavLink
            path={props.docUrl}
            className={`${styles['lesson-card__button']} btn btn-light mr-2 my-1 text-primary`}
            external
          >
            Start Lesson
          </NavLink>
          <NavLink
            path={props.challengesUrl}
            className={`${styles['lesson-card__button']} btn bg-primary my-1 text-white border border-white`}
          >
            View Challenges
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default LessonCard
