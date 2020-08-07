import * as React from 'react'
import ProfileSubmissions from '../../components/ProfileSubmissions'

export default {
  component: ProfileSubmissions,
  title: 'Components/ProfileSubmissions'
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
  { challengeNumber: 1, challengeStatus: 'open' },
  { challengeNumber: 2, challengeStatus: 'open' },
  { challengeNumber: 3, challengeStatus: 'open' },
  { challengeNumber: 4, challengeStatus: 'open' },
  { challengeNumber: 5 },
  { challengeNumber: 6, challengeStatus: 'open' },
  { challengeNumber: 7, challengeStatus: 'open' },
  { challengeNumber: 8, challengeStatus: 'open' },
  { challengeNumber: 9 },
  { challengeNumber: 10 },
  { challengeNumber: 11, challengeStatus: 'open' },
  { challengeNumber: 12, challengeStatus: 'open' }
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
  { challengeNumber: 1, challengeStatus: 'needMoreWork' },
  { challengeNumber: 2, challengeStatus: 'needMoreWork' },
  { challengeNumber: 3, challengeStatus: 'needMoreWork' },
  { challengeNumber: 4, challengeStatus: 'needMoreWork' },
  { challengeNumber: 5, challengeStatus: 'needMoreWork' },
  { challengeNumber: 6, challengeStatus: 'needMoreWork' },
  { challengeNumber: 7, challengeStatus: 'needMoreWork' }
]

const challengesLesson6 = [
  { challengeNumber: 1, challengeStatus: 'open' },
  { challengeNumber: 2, challengeStatus: 'open' },
  { challengeNumber: 3, challengeStatus: 'open' },
  { challengeNumber: 4, challengeStatus: 'open' },
  { challengeNumber: 5, challengeStatus: 'open' },
  { challengeNumber: 6, challengeStatus: 'open' },
  { challengeNumber: 7, challengeStatus: 'open' },
  { challengeNumber: 8, challengeStatus: 'open' }
]

const challengesLesson9 = [
  { challengeNumber: 1, challengeStatus: 'open' },
  { challengeNumber: 2, challengeStatus: 'open' },
  { challengeNumber: 3, challengeStatus: 'open' },
  { challengeNumber: 4, challengeStatus: 'open' },
  { challengeNumber: 5, challengeStatus: 'open' }
]

const starsReceived = [
  {
    studentId: 2,
    mentorId: 5,
    lessonId: 1,
    comment: 'Thank you'
  },
  {
    studentId: 7,
    mentorId: 5,
    lessonId: 1,
    comment: 'Thank you so much!'
  }
]

const lessons = [
  {
    order: 0,
    title: 'Foundation of Javascript',
    challenges: completedChallenges,
    starsReceived
  },
  {
    order: 1,
    title: 'Variables & Functions',
    challenges: defaultChallenges,
    starsReceived
  },
  {
    order: 2,
    title: 'Arrays',
    challenges: pendingChallenges,
    starsReceived
  },
  {
    order: 3,
    title: 'Objects',
    challenges: completedChallenges,
    starsReceived
  },
  {
    order: 4,
    title: 'Front End Engineering',
    challenges: rejectedChallenges,
    starsReceived
  },
  {
    order: 5,
    title: 'End to End',
    challenges: defaultChallenges,
    starsReceived
  },
  {
    order: 6,
    title: 'React, GraphQL, SocketIO',
    challenges: challengesLesson6,
    starsReceived
  },
  {
    order: 7,
    title: 'Javscript Algorithms',
    challenges: pendingChallenges,
    starsReceived
  },
  {
    order: 8,
    title: 'Trees',
    challenges: defaultChallenges,
    starsReceived
  },
  {
    order: 9,
    title: 'General Algorithms',
    challenges: challengesLesson9
  }
]

export const ProfileSubmissionsCard: React.FC = () => (
  <ProfileSubmissions lessons={lessons} />
)
