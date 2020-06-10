import * as React from 'react'
import Layout from '../components/Layout'
import ProfileImageInfo from '../components/ProfileImageInfo'
import { Lesson } from '../@types/lesson'
import ProfileLessons from '../components/ProfileLessons'
import ProfileSubmissions from '../components/ProfileSubmissions'
import withQueryLoader from '../containers/withQueryLoader'
import { GET_APP } from '../graphql/queries'

type SessionUser = {
  username: string
  name: string
}

type AppQuery = {
  queryData: AppInfo
}

type AppInfo = {
  session: Session
  lessons: Lesson[]
}

type Session = {
  user: SessionUser
  submissions: Submission[]
}

type Submission = {
  diff: string
  status: string
  lessonId: number
  challengeId: number
}

const UserProfile: React.FC<AppQuery> = ({ queryData }) => {
  const userInfo = {
    username: queryData.session.user.username,
    firstName: queryData.session.user.name.split(' ')[0],
    lastName: queryData.session.user.name.split(' ')[1]
  }

  const lessonInfo = queryData.lessons.map(lesson => {
    /*const lessonProgress =
      queryData.session.submissions.filter(
        r => r.status === 'passed' && r.lessonId === lesson.id
      ).length / lesson.challenges.length */
    const challengesInLesson = lesson.challenges
    console.log('Challenges in lesson:', challengesInLesson)
    const submissionsInLesson = queryData.session.submissions.filter(
      eachSubmission =>
        eachSubmission.status === 'passed' &&
        eachSubmission.lessonId === lesson.id
    )
    console.log('Submission in lesson:', submissionsInLesson)
    const updateSubmissions = submissionsInLesson.filter(eachSubmission => {
      return eachSubmission.challengeId
    })
    const lessonProgress = updateSubmissions.length / challengesInLesson.length
    const progress = Math.floor(lessonProgress * 100)
    const order = lesson.order
    return {
      progress,
      order
    }
  })

  const lessons = queryData.lessons.map(lesson => {
    console.log('lesson:', lesson)
    const order = lesson.order
    const title = lesson.title

    const lessonChallenges = queryData.session.submissions.filter(
      r => r.lessonId === lesson.id
    )
    const status = lessonChallenges.map((eachChallenge, challengeOrder) => {
      return {
        challengeNumber: challengeOrder,
        challengeStatus: eachChallenge.status
      }
    })
    return {
      order,
      title,
      challenges: status
    }
  })

  return (
    <Layout>
      <>
        <div className="row">
          <div className="col-4">
            <ProfileImageInfo user={userInfo} />
          </div>
          <div className="col-8">
            <ProfileLessons lessons={lessonInfo} />
            <ProfileSubmissions lessons={lessons} />
          </div>
        </div>
      </>
    </Layout>
  )
}

export default withQueryLoader(
  {
    query: GET_APP
  },
  UserProfile
)
