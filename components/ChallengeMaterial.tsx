import React, { useState } from 'react'
import {
  Challenge,
  ChallengeSubmissionData,
  UserSubmission,
  UserSubmissionsObject
} from '../@types/challenge'
import { LessonStatus } from '../@types/lesson'
import NavLink from './NavLink'
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'
import Prism from 'prismjs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import _ from 'lodash'

dayjs.extend(relativeTime)

type CurrentChallengeID = string | null

type ChallengeTitleCardProps = {
  key: string
  id: string
  title: string
  challengeNum: number
  submissionStatus: string
  active?: boolean
  setCurrentChallenge: React.Dispatch<CurrentChallengeID>
}

type ChallengeQuestionCardProps = {
  currentChallenge: ChallengeSubmissionData
}

type ChallengeMaterialProps = {
  challenges: Challenge[]
  userSubmissions: UserSubmission[]
  lessonStatus: LessonStatus
  chatUrl: string
  lessonId: string
}

type StatusIconProps = {
  status: string
}

type ReviewStatusProps = {
  status: string
  reviewerUserName: string | null
}

type ChallengesCompletedCardProps = {
  imageSrc: string
  reviewUrl: string
  chatUrl: string
}

export const ReviewStatus: React.FC<ReviewStatusProps> = ({
  status,
  reviewerUserName
}) => {
  //TODO change reviewerUserName to NavLink to Profile Page when page is completed
  let reviewStatusComment
  let statusClassName
  switch (status) {
    case 'passed':
      reviewStatusComment = `Your solution was reviewed and accepted by ${reviewerUserName}`
      statusClassName = 'border border-success text-success'
      break
    case 'needMoreWork':
      reviewStatusComment = `Your solution was reviewed and rejected by ${reviewerUserName}`
      statusClassName = 'border border-danger text-danger'
      break
    case 'open':
      reviewStatusComment = 'Your MR is currently waiting to be reviewed'
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

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === 'unsubmitted') {
    return null
  }
  let statusIconUrl
  switch (status) {
    case 'passed':
      statusIconUrl = '/curriculumAssets/icons/checkmark.svg'
      break
    case 'needMoreWork':
      statusIconUrl = '/curriculumAssets/icons/rejected.svg'
      break
    case 'open':
      statusIconUrl = '/curriculumAssets/icons/pending.svg'
  }
  return <img width="25px" height="25px" src={statusIconUrl} />
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
  if (submissionStatus === 'passed') {
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

export const ChallengeQuestionCard: React.FC<ChallengeQuestionCardProps> = ({
  currentChallenge
}) => {
  const diff = _.get(currentChallenge, 'submission.diff', '')
  const comment = _.get(currentChallenge, 'submission.comment', '')
  const updatedAt = _.get(currentChallenge, 'submission.updatedAt', Date.now())
  const reviewerUserName = _.get(
    currentChallenge,
    'submission.reviewer.username',
    null
  )
  let files = null

  if (diff) files = gitDiffParser.parse(diff)

  const renderFile = ({ hunks, newPath }: File) => {
    const oldValue: String[] = []
    const newValue: String[] = []

    hunks.forEach(hunk => {
      hunk.changes.forEach(change => {
        if (change.isDelete) oldValue.push(change.content)
        else if (change.isInsert) newValue.push(change.content)
        else {
          oldValue.push(change.content)
          newValue.push(change.content)
        }
      })
    })

    const syntaxHighlight = (str: string): any => {
      if (!str) return

      const language = Prism.highlight(
        str,
        Prism.languages.javascript,
        'javascript'
      )
      return <span dangerouslySetInnerHTML={{ __html: language }} />
    }

    return (
      <ReactDiffViewer
        key={_.uniqueId()}
        oldValue={oldValue.join('\n')}
        newValue={newValue.join('\n')}
        renderContent={syntaxHighlight}
        splitView={false}
        leftTitle={`${newPath}`}
      />
    )
  }

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
              {files && files.map(renderFile)}
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

export const ChallengesCompletedCard: React.FC<ChallengesCompletedCardProps> = props => {
  return (
    <div className="card text-center shadow-sm">
      <div className="card-body">
        <img
          src={`/curriculumAssets/icons/${props.imageSrc}`}
          className="mt-3"
        ></img>
        <h4 className="card-title mt-2">Congratulations!</h4>
        <p className="success-message">
          You have successfully completed all challenges
        </p>
        <p className="review-message">
          You can help your peers by
          <NavLink
            path={props.chatUrl}
            className="font-weight-bold mx-1"
            external
          >
            answering questions
          </NavLink>
          they have in the lesson and
          <NavLink
            path={props.reviewUrl}
            className="font-weight-bold mx-1"
            external
          >
            reviewing challenge submissions
          </NavLink>
        </p>
      </div>
      <div className="card-footer d-flex bg-primary">
        <p className="text-white mr-3 my-2">
          You can show your appreciation to the user that helped you the most by
          giving them a star
        </p>
        <button className="btn btn-light text-primary font-weight-bold ml-auto">
          Give Star
        </button>
      </div>
    </div>
  )
}

const ChallengeMaterial: React.FC<ChallengeMaterialProps> = ({
  challenges,
  userSubmissions,
  lessonStatus,
  chatUrl,
  lessonId
}) => {
  if (!challenges.length) {
    return <h1>No Challenges for this lesson</h1>
  }
  //create an object to evaluate the student's status with a challenge
  const userSubmissionsObject: UserSubmissionsObject = userSubmissions.reduce(
    (acc: UserSubmissionsObject, submission: UserSubmission) => {
      acc[submission.challengeId] = submission
      return acc
    },
    {}
  )
  //create a new Challenges array with user submission data integrated and sorted
  const challengesWithSubmissionData: ChallengeSubmissionData[] = challenges
    .sort((a, b) => a.order - b.order)
    .map((challenge: Challenge) => {
      const submission = userSubmissionsObject[challenge.id] || {}
      return {
        ...challenge,
        status: submission.status || 'unsubmitted',
        submission
      }
    })
  const [currentChallengeID, setCurrentChallenge] = useState<
    CurrentChallengeID
  >(null)

  const finalChallenge = {
    title: 'Challenges Completed!',
    id: 'finalChallenge',
    order: challenges.length + 1,
    description:
      'Congratulations, you have completed all Challenges for this Lesson',
    status: 'passed'
  }
  //find first challenge that is not passed on initial render after clicks will render clicked challenge
  const currentChallenge =
    challengesWithSubmissionData.find((challenge: ChallengeSubmissionData) => {
      if (currentChallengeID) return challenge.id === currentChallengeID
      return challenge.status !== 'passed'
    }) || finalChallenge
  const challengeTitleCards: React.ReactElement[] = challengesWithSubmissionData.map(
    challenge => {
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
    }
  )
  return (
    <div className="row challenge-display mt-3">
      <div className="col-4">
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
      <div className="col-8">
        {currentChallenge.id !== 'finalChallenge' && (
          <ChallengeQuestionCard currentChallenge={currentChallenge} />
        )}
        {lessonStatus.isPassed && currentChallenge.id === 'finalChallenge' && (
          <ChallengesCompletedCard
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
