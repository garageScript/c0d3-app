import * as React from 'react'
import LessonsChallenges, {
  ChallengeStatus
} from '../../components/LessonsChallenges'

export default {
  component: LessonsChallenges,
  title: 'Components/LessonChallenges'
}

const completedChallenges = [
  { challengeNumber: 1, challengeStatus: 'passed' },
  { challengeNumber: 2, challengeStatus: 'passed' },
  { challengeNumber: 3, challengeStatus: 'passed' },
  { challengeNumber: 4, challengeStatus: 'passed' },
  { challengeNumber: 5, challengeStatus: 'passed' },
  { challengeNumber: 6, challengeStatus: 'passed' },
  { challengeNumber: 7, challengeStatus: 'passed' },
  { challengeNumber: 8, challengeStatus: 'passed' },
  { challengeNumber: 9, challengeStatus: 'passed' },
  { challengeNumber: 10, challengeStatus: 'passed' }
]

const defaultChallenges = [
  { challengeNumber: 1, challengeStatus: 'default' },
  { challengeNumber: 2, challengeStatus: 'default' },
  { challengeNumber: 3, challengeStatus: 'default' },
  { challengeNumber: 4, challengeStatus: 'default' },
  { challengeNumber: 5 },
  { challengeNumber: 6, challengeStatus: 'default' },
  { challengeNumber: 7, challengeStatus: 'default' },
  { challengeNumber: 8, challengeStatus: 'default' },
  { challengeNumber: 9 },
  { challengeNumber: 10 },
  { challengeNumber: 11, challengeStatus: 'default' },
  { challengeNumber: 12, challengeStatus: 'default' }
]

const pendingChallenges = [
  { challengeNumber: 1, challengeStatus: 'pending' },
  { challengeNumber: 2, challengeStatus: 'pending' },
  { challengeNumber: 3, challengeStatus: 'pending' },
  { challengeNumber: 4, challengeStatus: 'pending' },
  { challengeNumber: 5, challengeStatus: 'pending' },
  { challengeNumber: 6, challengeStatus: 'pending' },
  { challengeNumber: 7, challengeStatus: 'pending' },
  { challengeNumber: 8, challengeStatus: 'pending' },
  { challengeNumber: 9, challengeStatus: 'pending' },
  { challengeNumber: 10, challengeStatus: 'pending' },
  { challengeNumber: 11, challengeStatus: 'pending' }
]

const rejectedChallenges = [
  { challengeNumber: 1, challengeStatus: 'wrong' },
  { challengeNumber: 2, challengeStatus: 'wrong' },
  { challengeNumber: 3, challengeStatus: 'wrong' },
  { challengeNumber: 4, challengeStatus: 'wrong' },
  { challengeNumber: 5, challengeStatus: 'wrong' },
  { challengeNumber: 6, challengeStatus: 'wrong' },
  { challengeNumber: 7, challengeStatus: 'wrong' }
]

const challengesLesson6 = [
  { challengeNumber: 1, challengeStatus: 'default' },
  { challengeNumber: 2, challengeStatus: 'default' },
  { challengeNumber: 3, challengeStatus: 'default' },
  { challengeNumber: 4, challengeStatus: 'default' },
  { challengeNumber: 5, challengeStatus: 'default' },
  { challengeNumber: 6, challengeStatus: 'default' },
  { challengeNumber: 7, challengeStatus: 'default' },
  { challengeNumber: 8, challengeStatus: 'default' }
]

const challengesLesson9 = [
  { challengeNumber: 1, challengeStatus: 'default' },
  { challengeNumber: 2, challengeStatus: 'default' },
  { challengeNumber: 3, challengeStatus: 'default' },
  { challengeNumber: 4, challengeStatus: 'default' },
  { challengeNumber: 5, challengeStatus: 'default' }
]

const lessons = [
  {
    order: 0,
    title: 'Foundation of Javascript',
    challenges: completedChallenges
  },
  {
    order: 1,
    title: 'Variables & Functions',
    challenges: defaultChallenges
  },
  {
    order: 2,
    title: 'Arrays',
    challenges: pendingChallenges
  },
  {
    order: 3,
    title: 'Objects',
    challenges: completedChallenges
  },
  {
    order: 4,
    title: 'Front End Engineering',
    challenges: rejectedChallenges
  },
  {
    order: 5,
    title: 'End to End',
    challenges: defaultChallenges
  },
  {
    order: 6,
    title: 'React, GraphQL, SocketIO',
    challenges: challengesLesson6
  },
  {
    order: 7,
    title: 'Javscript Algorithms',
    challenges: pendingChallenges
  },
  {
    order: 8,
    title: 'Trees',
    challenges: defaultChallenges
  },
  {
    order: 9,
    title: 'General Algorithms',
    challenges: challengesLesson9
  }
]

export const LessonsChallengesCard: React.FC = () => (
  <LessonsChallenges lessons={lessons} />
)

export const ChallengeStatusCard: React.FC = () => (
  <ChallengeStatus challengesData={defaultChallenges} />
)
