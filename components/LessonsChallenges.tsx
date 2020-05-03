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
  totalChallenges: number
  correctAnswers: number
  challenges: Challenge[]
}

type Challenge = {
  challengeNumber: number
  challengeStatus: string
}

export const ChallengeStatus: React.FC<ChallengeStatusProps> = props => {
  const displayChallengeStatus = props.challengesData.map(
    (eachChallenge, challengeId) => {
      let challengeStatus = 'default_challenge_status'
      if (eachChallenge.challengeStatus === 'passed') {
        challengeStatus = 'passed_challenge_status'
      }
      if (eachChallenge.challengeStatus === 'wrong answer') {
        challengeStatus = 'unapproved_challenge_status'
      }
      if (eachChallenge.challengeStatus === 'pending') {
        challengeStatus = 'pending_challenge_status'
      }
      return (
        <span
          key={challengeId}
          className={`challenge_status ${challengeStatus}`}
        ></span>
      )
    }
  )
  return <div className="challenges_container">{displayChallengeStatus}</div>
}

const LessonsChallenges: React.FC<LessonChallengeProps> = props => {
  const displayLessons = props.lessons.map((lesson, lessonId) => {
    return (
      <div key={lessonId} className="lesson_challenges">
        <img
          src={`/curriculumAssets/lessonCoversSvg/js-${lesson.order}-cover.svg`}
        />
        <div className="lesson_title_container">
          <h6 className="lesson_titles">{lesson.title}</h6>
          <h6 className="challenges_stats">
            {`${lesson.correctAnswers} of ${lesson.challenges.length}  Challenges completed`}
          </h6>
          <ChallengeStatus challengesData={lesson.challenges} />
        </div>
      </div>
    )
  })
  return (
    <div className="card shadow-sm">
      <div className="card-body lessons_challenges_card_body">
        <h3 className="main_title">Challenges</h3>
        <div className="display_lessons">{displayLessons}</div>
      </div>
    </div>
  )
}

export default LessonsChallenges
