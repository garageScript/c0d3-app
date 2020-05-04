import React from 'react'
import '../scss/lessonsChallenges.scss'

type ChallengeStatusProps = {
  challengesData: Challenge[]
}

type LessonChallengeProps = {
  lessons: LessonChallenge[]
}

type LessonChallenge = {
  order: number
  title: string
  challenges: Challenge[]
}

type Challenge = {
  challengeNumber: number
  challengeStatus?: string
}

export const ChallengeStatus: React.FC<ChallengeStatusProps> = ({
  challengesData
}) => {
  const displayChallengeStatus = challengesData.map(
    (eachChallenge: Challenge, challengeId: number) => {
      let challengeStatus = 'bg-gray'
      if (eachChallenge.challengeStatus === 'passed') {
        challengeStatus = 'bg-success'
      }
      if (eachChallenge.challengeStatus === 'wrong') {
        challengeStatus = 'bg-danger'
      }
      if (eachChallenge.challengeStatus === 'pending') {
        challengeStatus = 'bg-warning'
      }
      return (
        <span
          key={challengeId}
          className={`challenge_status ${challengeStatus}`}
        />
      )
    }
  )
  return <div>{displayChallengeStatus}</div>
}

const LessonsChallenges: React.FC<LessonChallengeProps> = ({ lessons }) => {
  const displayLessons = lessons.map((lesson, lessonId) => {
    const filterPassedChallenges = lesson.challenges.filter(
      e => e.challengeStatus === 'passed'
    )
    return (
      <div key={lessonId} className="lesson_challenges">
        <img
          src={`/curriculumAssets/lessonCoversSvg/js-${lesson.order}-cover.svg`}
        />
        <div className="lesson_title_container">
          <h6 className="lesson_titles">{lesson.title}</h6>
          <h6 className="challenges_stats">
            {`${filterPassedChallenges.length} of ${lesson.challenges.length}  Challenges completed`}
          </h6>
          <ChallengeStatus challengesData={lesson.challenges} />
        </div>
      </div>
    )
  })
  return (
    <div className="card shadow-sm profile-submissions">
      <div className="card-body lessons_challenges_card_body">
        <h3>Challenges</h3>
        <div className="display_lessons">{displayLessons}</div>
      </div>
    </div>
  )
}

export default LessonsChallenges
