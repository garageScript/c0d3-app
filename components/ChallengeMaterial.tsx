import React, { useState } from 'react'
import {
  Challenge,
  GetAppQuery,
  Submission,
  UserLesson
} from '../graphql/index'
import NavLink from './NavLink'
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'c0d3-diff'
import Prism from 'prismjs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GiveStarCard } from '../components/GiveStarCard'
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal'
import { SubmissionStatus } from '../graphql'
import DiffView from './DiffView'

dayjs.extend(relativeTime)

type CurrentChallengeID = number | null

type ReviewStatusProps = {
  status: string
  reviewerUserName: string | null
}

type ChallengeSubmissionData = Challenge & {
  status: string
  submission?: Submission
}

type UserSubmissionsObject = {
  [submissionId: number]: Submission
}

export const ReviewStatus: React.FC<ReviewStatusProps> = ({
  status,
  reviewerUserName
}) => {
  let reviewStatusComment
  let statusClassName
  const profileLink = (
    <NavLink
      className="text-reset"
      path="/profile/[username]"
      as={`/profile/${reviewerUserName}`}
    >
      {reviewerUserName}
    </NavLink>
  )
  switch (status) {
    case SubmissionStatus.Passed:
      reviewStatusComment = (
        <>Your solution was reviewed and accepted by {profileLink}</>
      )
      statusClassName = 'border border-success text-success'
      break
    case SubmissionStatus.NeedMoreWork:
      reviewStatusComment = (
        <>Your solution was reviewed and rejected by {profileLink}</>
      )
      statusClassName = 'border border-danger text-danger'
      break
    case SubmissionStatus.Open:
      reviewStatusComment = (
        <>Your submission is currently waiting to be reviewed</>
      )
      statusClassName = 'border border-warning text-warning'
      break
    default:
      return null
  }
  return (
    <div className={`text-center p-2 my-2 ${statusClassName}`}>
      {reviewStatusComment}
    </div>
  )
}

type StatusIconProps = {
  status: string
}
const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === 'unsubmitted') {
    return null
  }
  let statusIconUrl
  switch (status) {
    case SubmissionStatus.Passed:
      statusIconUrl = '/assets/curriculum/icons/checkmark.svg'
      break
    case SubmissionStatus.NeedMoreWork:
      statusIconUrl = '/assets/curriculum/icons/rejected.svg'
      break
    case SubmissionStatus.Open:
      statusIconUrl = '/assets/curriculum/icons/pending.svg'
  }
  return <img width="25px" height="25px" src={statusIconUrl} />
}

type ChallengeTitleCardProps = {
  key: number
  id: number
  title: string
  challengeNum: number
  submissionStatus: string
  active?: boolean
  setCurrentChallenge: React.Dispatch<CurrentChallengeID>
}

export const ChallengeTitleCard: React.FC<ChallengeTitleCardProps> = ({
  submissionStatus,
  active,
  title,
  id,
  challengeNum,
  setCurrentChallenge
}) => {
  const cardStyles: string[] = ['challenge-title-card']
  if (active) {
    cardStyles.push('challenge-title-card--active')
  }
  if (submissionStatus === SubmissionStatus.Passed) {
    cardStyles.push('challenge-title-card--done')
  } else {
    cardStyles.push('shadow-sm', 'border-0')
  }

  return (
    <div
      data-testid="challenge-title"
      className={`card mb-2 ${cardStyles.join(' ')}`}
      onClick={() => setCurrentChallenge(id)}
    >
      <div className="card-body d-flex justify-content-between">
        <div>{`${challengeNum}. ${title}`}</div>
        <StatusIcon status={submissionStatus} />
      </div>
    </div>
  )
}

type ChallengeQuestionCardProps = {
  currentChallenge: ChallengeSubmissionData
  session: GetAppQuery['session']
}
export const ChallengeQuestionCard: React.FC<ChallengeQuestionCardProps> = ({
  currentChallenge,
  session
}) => {
  const diff = _.get(currentChallenge, 'submission.diff', '')
  const comment = _.get(currentChallenge, 'submission.comment', '')
  const updatedAt = _.get(currentChallenge, 'submission.updatedAt', Date.now())
  const reviewerUserName = _.get(
    currentChallenge,
    'submission.reviewer.username',
    null
  )
  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body challenge-question">
          <h1 data-testid="challenge-question-title" className="card-title">
            {currentChallenge.title}
          </h1>
          <div
            data-testid="challenge-question-description"
            className="bg-light p-3 mt-3"
          >
            <Markdown>{currentChallenge.description}</Markdown>
          </div>
        </div>
      </div>

      {diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">
            Submitted {dayjs(parseInt(updatedAt)).fromNow()}
          </div>
          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              {
                <DiffView
                  diff={diff}
                  id={currentChallenge.submission!.id}
                  name={session?.user?.name!}
                  username={session?.user?.username!}
                  comments={currentChallenge.submission?.comments}
                  status={currentChallenge.status}
                />
              }
            </div>
          </div>
          <div className="card-footer bg-white">
            {comment && <Markdown>{comment}</Markdown>}
            <ReviewStatus
              status={currentChallenge.status}
              reviewerUserName={reviewerUserName}
            />
          </div>
        </div>
      )}
    </>
  )
}

type ChallengesCompletedCardProps = {
  lessonId: number
  starGiven: string
  imageSrc: string
  reviewUrl: string
  chatUrl: string
}

export const ChallengesCompletedCard: React.FC<ChallengesCompletedCardProps> =
  ({ imageSrc, chatUrl, reviewUrl, starGiven, lessonId }) => {
    const [show, setShow] = useState<boolean>(false)
    const [star, setStar] = useState<string>(starGiven)
    return (
      <>
        <GiveStarCard
          close={() => setShow(false)}
          show={show}
          starGiven={star}
          setStarGiven={setStar}
          lessonId={lessonId}
        />
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <img
              src={`/assets/curriculum/icons/${imageSrc}`}
              className="mt-3"
            />
            <h4 className="card-title mt-2">Congratulations!</h4>
            <p className="success-message">
              You have successfully completed all challenges
            </p>
            <p className="review-message">
              You can help your peers by
              <NavLink
                path={chatUrl}
                className="font-weight-bold mx-1"
                external
              >
                answering questions
              </NavLink>
              they have in the lesson and
              <NavLink
                path={reviewUrl}
                className="font-weight-bold mx-1"
                external
              >
                reviewing challenge submissions
              </NavLink>
            </p>
          </div>
          <div className="card-footer d-flex bg-primary">
            <p className="text-white mr-3 my-2">
              You can show your appreciation to the user that helped you the
              most by giving them a star
            </p>
            <button
              className="btn btn-light text-primary font-weight-bold ml-auto"
              onClick={() => setShow(true)}
            >
              Give Star
            </button>
          </div>
        </div>
      </>
    )
  }

type ChallengeMaterialProps = {
  challenges: Challenge[]
  userSubmissions: Submission[]
  lessonStatus: UserLesson
  chatUrl: string
  lessonId: number
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  session: GetAppQuery['session']
}

const ChallengeMaterial: React.FC<ChallengeMaterialProps> = ({
  challenges,
  userSubmissions,
  lessonStatus,
  chatUrl,
  lessonId,
  show,
  setShow,
  session
}) => {
  if (!challenges.length) {
    return <h1>No Challenges for this lesson</h1>
  }
  //create an object to evaluate the student's status with a challenge
  const userSubmissionsObject: UserSubmissionsObject = userSubmissions.reduce(
    (acc: UserSubmissionsObject, submission: Submission) => {
      acc[submission.challengeId] = submission
      return acc
    },
    {}
  )
  //chain sort-map causes errors in tests without a copy
  const challengesCopy = [...challenges]
  //create a new Challenges array with user submission data integrated and sorted
  const challengesWithSubmissionData: ChallengeSubmissionData[] = challengesCopy
    .sort((a, b) => a.order - b.order)
    .map((challenge: Challenge) => {
      const submission = userSubmissionsObject[challenge.id] || {}
      return {
        ...challenge,
        status: submission.status || 'unsubmitted',
        submission
      }
    })
  const [currentChallengeID, setCurrentChallenge] =
    useState<CurrentChallengeID>(null)

  const finalChallenge = {
    title: 'Challenges Completed!',
    id: 0,
    order: challenges.length + 1,
    lessonId: 0,
    description:
      'Congratulations, you have completed all Challenges for this Lesson',
    status: SubmissionStatus.Passed
  }
  //find first challenge that is not passed on initial render after clicks will render clicked challenge
  const currentChallenge =
    challengesWithSubmissionData.find((challenge: ChallengeSubmissionData) => {
      if (currentChallengeID) return challenge.id === currentChallengeID
      return challenge.status !== SubmissionStatus.Passed
    }) || finalChallenge
  const challengeTitleCards: React.ReactElement[] =
    challengesWithSubmissionData.map(challenge => {
      return (
        <ChallengeTitleCard
          key={challenge.id}
          id={challenge.id}
          challengeNum={challenge.order}
          title={challenge.title}
          setCurrentChallenge={setCurrentChallenge}
          active={challenge.id === currentChallenge.id}
          submissionStatus={challenge.status}
        />
      )
    })
  const challengeList = (
    <div
      className={`challenge-display_challenges ${show && 'show'} col-md-4`}
      onClick={() => {
        setShow(!show)
      }}
    >
      {challengeTitleCards}
      {lessonStatus.isPassed && (
        <ChallengeTitleCard
          key={finalChallenge.id}
          id={finalChallenge.id}
          challengeNum={finalChallenge.order}
          title={finalChallenge.title}
          setCurrentChallenge={setCurrentChallenge}
          active={finalChallenge.id === currentChallenge.id}
          submissionStatus={finalChallenge.status}
        />
      )}
    </div>
  )
  return (
    <div className="row challenge-display mt-3">
      {window.innerWidth > 768 ? (
        challengeList
      ) : (
        <Modal
          show={show}
          onHide={() => {
            setShow(!show)
          }}
          centered
          className="challenge-modal"
          data-testid="modal-challenges"
        >
          <Modal.Body>{challengeList}</Modal.Body>
        </Modal>
      )}

      <div className="col-md-8">
        {currentChallenge.id !== finalChallenge.id && (
          <ChallengeQuestionCard
            currentChallenge={currentChallenge}
            session={session}
          />
        )}
        {lessonStatus.isPassed && currentChallenge.id === 0 && (
          <ChallengesCompletedCard
            lessonId={lessonId}
            starGiven={lessonStatus.starGiven || ''}
            imageSrc="icon-challenge-complete.jpg"
            chatUrl={chatUrl}
            reviewUrl={`https://www.c0d3.com/review/${lessonId}`}
          />
        )}
      </div>
    </div>
  )
}

export default ChallengeMaterial
