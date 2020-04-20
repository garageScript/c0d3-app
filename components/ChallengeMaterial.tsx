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
import SessionContext from '../helpers/contexts/session'
import ReactDiffViewer from 'react-diff-viewer'

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

type ChallengesCompletedCardProps = {
  imageSrc: string
  reviewUrl: string
  chatUrl: string
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
  const { data } = React.useContext(SessionContext)

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

      {currentChallenge.submission?.diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">{data.userInfo?.username}</div>
          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <ReactDiffViewer
                oldValue={``}
                newValue={`${currentChallenge.submission?.diff}`}
                splitView={false}
              />
            </div>
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
  const userSubmissionsObject = userSubmissions.reduce(
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
    <div className="row challenge-display">
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
            reviewUrl={`https:/c0d3.com/teacher/${lessonId}`}
          />
        )}
      </div>
    </div>
  )
}

export default ChallengeMaterial
