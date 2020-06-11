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

const UserProfile: React.FC<AppQuery> = ({
  queryData: { lessons, session }
}) => {
  const userInfo = {
    username: session.user.username,
    firstName: session.user.name.split(' ')[0],
    lastName: session.user.name.split(' ')[1]
  }

  const lessonInfo = lessons.map((lesson: any) => {
    const { challenges, order } = lesson
    const { submissions } = session
    const passedLessonSubmissions = submissions.filter(
      ({ status, lessonId }) => status === 'passed' && lessonId === lesson.id
    )
    const updateSubmissions = passedLessonSubmissions.filter(
      ({ challengeId }) => challengeId
    )
    const lessonProgress = updateSubmissions.length / challenges.length
    const progress = Math.floor(lessonProgress * 100)

    return { progress, order }
  })

  const profileLessons = lessons.map(({ order, title, challenges }) => {
    const { submissions } = session

    const challengesStatus = challenges.map((c, order) => {
      const challengeSubmission = submissions.find(s => c.id === s.challengeId)

      return {
        challengeNumber: order,
        challengeStatus: challengeSubmission
          ? challengeSubmission.status
          : 'open'
      }
    })

    return {
      order,
      title,
      challenges: challengesStatus
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
            <ProfileSubmissions lessons={profileLessons} />
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
