import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CheckCircle } from 'react-feather'
import { GET_SUBMISSIONS } from '../graphql/queries'
import Link from 'next/link'
import '../scss/lessonCard.scss'

type Props = {
  lessonId: number
  coverImg: string
  title: string
  challengeCount: number
  description: string
  currentState?: string
  reviewUrl: string
  challengesUrl: string
  docUrl: string
  shouldNotGetCount?: boolean
}

type ReviewButtonProps = {
  isCompleted: boolean
  reviewUrl: string
  lessonId: number
  shouldNotGetCount?: boolean
}

type ReviewCountProps = {
  shouldNotGetCount?: boolean
  lessonId: number
}

const ReviewCount: React.FC<ReviewCountProps> = props => {
  if (props.shouldNotGetCount) {
    return null
  }

  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: {
      in: {
        id: `${props.lessonId}`
      }
    }
  })

  if (loading) {
    return <span> ... </span>
  }

  if (!data) {
    return null
  }
  const pendingSubmissionsCount = data.submissions.reduce(
    (acc: number, val: any) => {
      if (val.status === 'open') {
        acc = acc + 1
        return acc
      }
      return acc
    },
    0
  )

  return <span> {pendingSubmissionsCount} </span>
}

const ReviewButton: React.FC<ReviewButtonProps> = props => {
  if (!props.isCompleted) {
    return null
  }
  return (
    <a
      href={props.reviewUrl}
      className="btn btn-sm bg-primary text-white float-right mb-2 mr-2"
    >
      Review
      <ReviewCount
        shouldNotGetCount={props.shouldNotGetCount}
        lessonId={props.lessonId}
      />
      Submissions
    </a>
  )
}

const LessonCard: React.FC<Props> = props => {
  const containerClass =
    props.currentState === 'inProgress'
      ? 'lesson-card__container_inprogress border-primary'
      : 'border-0'

  return (
    <div className={`card shadow-sm mt-3 ${containerClass}`}>
      <div className="d-flex p-2">
        <img
          src={`/curriculumAssets/lessonCoversSvg/${props.coverImg}`}
          alt={props.coverImg}
        />

        <div className="w-100 pl-4">
          {props.currentState === 'completed' && (
            <span className="badge badge-pill badge-success float-right mt-2 mr-2 lesson-card__container_completed">
              <CheckCircle style={{ height: '15px', marginTop: '-2px' }} />
              <span className="mr-1">COMPLETED</span>
            </span>
          )}
          <div>
            <h4 className="lesson-card__title font-weight-bold mt-3">
              <Link href={`/curriculum/${props.lessonId}`}>
                <a>{props.title}</a>
              </Link>
            </h4>
            <div>
              <div className="d-inline-block mr-4">
                <img
                  className="mr-2"
                  src="/curriculumAssets/icons/icon-challenge.svg"
                  alt="icon-challenge"
                />
                <span className="lesson-card__icon-text">
                  {props.challengeCount} CHALLENGES
                </span>
              </div>
            </div>
            <p className="lesson-card__description mt-2">{props.description}</p>
          </div>
          <ReviewButton
            isCompleted={props.currentState === 'completed'}
            reviewUrl={props.reviewUrl}
            shouldNotGetCount={props.shouldNotGetCount}
            lessonId={props.lessonId}
          />
        </div>
      </div>

      {props.currentState === 'inProgress' && (
        <div className="p-2 bg-primary">
          <a
            className="lesson-card__button btn btn-light mr-2 my-1 text-primary"
            href={props.docUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Lesson
          </a>
          <a
            className="lesson-card__button btn bg-primary my-1 text-white border border-white"
            href={props.challengesUrl}
          >
            View Challenges
          </a>
        </div>
      )}
    </div>
  )
}

export default LessonCard
