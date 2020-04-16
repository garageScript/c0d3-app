import React, { useState } from 'react'
import {
  Challenge,
  ChallengeSubmissionData,
  UserSubmission,
  UserSubmissionsObject
} from '../@types/challenge'
import Markdown from 'markdown-to-jsx'

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
  currentChallenge: Challenge
}

type ChallengeMaterialProps = {
  userSubmissions: UserSubmission[]
  challenges: Challenge[]
}

type StatusIconProps = {
  status: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === 'unsubmitted') {
    return <></>
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
  return (
    <>
      <img width="25px" height="25px" src={statusIconUrl} />
    </>
  )
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
  return (
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
  )
}

const ChallengeMaterial: React.FC<ChallengeMaterialProps> = ({
  userSubmissions,
  challenges
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
  //find first challenge that is not passed on initial render after clicks will render clicked challenge
  const currentChallenge = challengesWithSubmissionData.find(
    (challenge: ChallengeSubmissionData) => {
      if (currentChallengeID) return challenge.id === currentChallengeID
      return challenge.status !== 'passed'
    }
  ) as ChallengeSubmissionData

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
      <div className="col-4">{challengeTitleCards}</div>
      <div className="col-8">
        <ChallengeQuestionCard currentChallenge={currentChallenge} />
      </div>
    </div>
  )
}

export default ChallengeMaterial
