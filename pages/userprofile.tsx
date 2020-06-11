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
    const challengesInLesson = lesson.challenges
    const submissionsInLesson = queryData.session.submissions.filter(
      eachSubmission =>
        eachSubmission.status === 'passed' &&
        eachSubmission.lessonId === lesson.id
    )
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
    const order = lesson.order
    const title = lesson.title
    const challengesInLesson = lesson.challenges
    const challengesStatus = challengesInLesson.map(eachChallenge => {
      return queryData.session.submissions.find(submission => {
        return eachChallenge.id === submission.challengeId
      })
    })
    const status = challengesStatus.map((eachSubmission, challengeOrder) => {
      if (!eachSubmission) {
        return {
          challengeNumber: challengeOrder,
          challengeStatus: 'open'
        }
      }
      return {
        challengeNumber: challengeOrder,
        challengeStatus: eachSubmission.status
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
