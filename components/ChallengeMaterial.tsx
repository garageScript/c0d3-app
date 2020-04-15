import React, { useState } from 'react'
import {
  Challenge,
  ChallengeSubmissionData,
  UserSubmission,
  UserSubmissionsObject
} from '../@types/challenge'

type CurrentChallengeID = string

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

export const ChallengeTitleCard: React.FC<ChallengeTitleCardProps> = ({
  submissionStatus,
  active,
  title,
  id,
  challengeNum,
  setCurrentChallenge
}) => {
  const cardStyles: string[] = []
  if (active) {
    cardStyles.push('challenge-title-card--active')
  }
  if (submissionStatus === 'passed') {
    cardStyles.push('challenge-title-card--done')
  } else {
    cardStyles.push('shadow-sm', 'border-0', 'challenge-title-card')
  }

  return (
    <div
      data-testid="challenge-title"
      className={`card mb-2 ${cardStyles.join(' ')}`}
      onClick={() => setCurrentChallenge(id)}
    >
      <div className="card-body d-flex justify-content-between">
        <div>{`${challengeNum}. ${title}`}</div>
        {submissionStatus === 'passed' && (
          <img
            width="25px"
            height="25px"
            src="/curriculumAssets/icons/checkmark.svg"
          />
        )}
        {submissionStatus === 'needMoreWork' && (
          <img
            width="25px"
            height="25px"
            src="/curriculumAssets/icons/pending.svg"
          />
        )}
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
        <div>
          <p
            data-testid="challenge-question-description"
            className="card-question bg-light p-3 mt-3"
          >
            {currentChallenge.description}
          </p>
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
  //create a new Challenges array with user submission data integrated
  const challengesWithSubmissionData = challenges.reduce(
    (acc: ChallengeSubmissionData[], challenge: Challenge) => {
      const submissionData = userSubmissionsObject[challenge.id] || {}
      acc.push(
        Object.assign(challenge, {
          status: submissionData.status || 'unsubmitted',
          submissionData
        })
      )
      return acc
    },
    []
  )
  //sort challenges by order
  const sortedChallenges: ChallengeSubmissionData[] = challengesWithSubmissionData.sort(
    (a, b) => a.order - b.order
  )

  //find first challenge that is not passed
  const firstChallenge = sortedChallenges.find(
    (challenge: ChallengeSubmissionData) => challenge.status !== 'passed'
  ) as ChallengeSubmissionData

  const [currentChallengeID, setCurrentChallenge] = useState<
    CurrentChallengeID
  >(firstChallenge.id)
  const currentChallenge = sortedChallenges.find(
    (challenge: ChallengeSubmissionData) => challenge.id === currentChallengeID
  ) as ChallengeSubmissionData
  const challengeTitleCards: React.ReactElement[] = sortedChallenges.map(
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
