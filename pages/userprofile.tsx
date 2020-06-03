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
}

const UserProfile: React.FC<AppQuery> = ({ queryData }) => {
  const userInfo = {
    username: queryData.session.user.username,
    firstName: queryData.session.user.name.split(' ')[0],
    lastName: queryData.session.user.name.split(' ')[1]
  }

  const lessonInfo = queryData.lessons.map(lesson => {
    const lessonProgress =
      queryData.session.submissions.filter(
        r => r.status === 'approved' && r.lessonId === lesson.id
      ).length / lesson.challenges.length
    const progress = Math.floor(lessonProgress * 100)
    const order = lesson.order
    return {
      progress,
      order
    }
  })

  return (
    <Layout>
      <>
        <ProfileImageInfo user={userInfo} />
        <ProfileLessons lessons={lessonInfo} />
        <ProfileSubmissions lessons={queryData.lessons} />
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
