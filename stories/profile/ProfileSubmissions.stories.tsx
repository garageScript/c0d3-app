import * as React from 'react'
import ProfileSubmissions from '../../components/ProfileSubmissions'
import { LessonChallenge } from '../../components/ProfileSubmissions'
import { SubmissionStatus } from '../../graphql'
import dummyLesson from '../../__dummy__/lessonData'

export default {
  component: ProfileSubmissions,
  title: 'Components/ProfileSubmissions'
}

const student = {
  id: 2,
  username: 'fakeusername',
  name: 'fake user',
  email: 'student@fakemail.com',
  isAdmin: false,
  discordUserId: '',
  discordUsername: '',
  discordAvatarUrl: ''
}

const mentor = {
  id: 1,
  username: 'admin',
  name: 'Admin Admin',
  email: 'mentor@fakemail.com',
  isAdmin: true,
  discordUsername: '',
  discordAvatarUrl: ''
}

const completedChallenges = [
  { challengeNumber: 1, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 2, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 3, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 4, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 5, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 6, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 7, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 8, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 9, challengeStatus: SubmissionStatus.Passed },
  { challengeNumber: 10, challengeStatus: SubmissionStatus.Passed }
]

const defaultChallenges = [
  { challengeNumber: 1, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 2, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 3, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 4, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 5 },
  { challengeNumber: 6, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 7, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 8, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 9 },
  { challengeNumber: 10 },
  { challengeNumber: 11, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 12, challengeStatus: SubmissionStatus.Open }
]

const pendingChallenges = [
  { challengeNumber: 1, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 2, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 3, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 4, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 5, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 6, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 7, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 8, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 9, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 10, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 11, challengeStatus: SubmissionStatus.Open }
]

const rejectedChallenges = [
  { challengeNumber: 1, challengeStatus: SubmissionStatus.NeedMoreWork },
  { challengeNumber: 2, challengeStatus: SubmissionStatus.NeedMoreWork },
  { challengeNumber: 3, challengeStatus: SubmissionStatus.NeedMoreWork },
  { challengeNumber: 4, challengeStatus: SubmissionStatus.NeedMoreWork },
  { challengeNumber: 5, challengeStatus: SubmissionStatus.NeedMoreWork },
  { challengeNumber: 6, challengeStatus: SubmissionStatus.NeedMoreWork },
  { challengeNumber: 7, challengeStatus: SubmissionStatus.NeedMoreWork }
]

const challengesLesson6 = [
  { challengeNumber: 1, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 2, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 3, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 4, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 5, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 6, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 7, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 8, challengeStatus: SubmissionStatus.Open }
]

const challengesLesson9 = [
  { challengeNumber: 1, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 2, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 3, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 4, challengeStatus: SubmissionStatus.Open },
  { challengeNumber: 5, challengeStatus: SubmissionStatus.Open }
]

const starsReceived = [
  {
    id: 1,
    lessonId: 1,
    lesson: dummyLesson[2],
    student,
    mentor,
    comment: 'Thank you'
  },
  {
    id: 2,
    lessonId: 1,
    lesson: dummyLesson[2],
    student,
    mentor,
    comment: 'Thank you so much!'
  }
]

const lessons: LessonChallenge[] = [
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
