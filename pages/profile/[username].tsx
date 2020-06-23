import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { Lesson } from '../../@types/lesson'
import { AppData } from '../../@types/app'
import { UserSubmission, Challenge } from '../../@types/challenge'
import { GET_APP, USER_INFO } from '../../graphql/queries'
import ProfileLessons from '../../components/ProfileLessons'
import ProfileImageInfo from '../../components/ProfileImageInfo'
import ProfileSubmissions from '../../components/ProfileSubmissions'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'

export type UserInfo = {
  username: string
  firstName: string
  lastName: string
}

const UserProfile: React.FC<QueryDataProps<AppData>> = ({ queryData }) => {
  const { lessons, session } = queryData
  const fullname = _.get(session, 'user.name', '')
  //const username = _.get(session, 'user.username', '')

  const router = useRouter()
  const username = router.query.username as string 
  console.log('username', username)

  const userInfo: UserInfo = {
    username,
    firstName: fullname.split(' ')[0],
    lastName: fullname.split(' ')[1]
  }

  const userSubmissions: UserSubmission[] = _.get(session, 'submissions', [])
  const lessonInfo = lessons.map((lesson: Lesson) => {
    const { challenges, order } = lesson
    const passedLessonSubmissions = userSubmissions.filter(
      ({ status, lessonId }) => {
        // TODO: Fix lesson.id and lessonId types
        return (
          status === 'passed' &&
          parseInt(lessonId || '') === parseInt(lesson.id + '')
        )
      }
    )
    const updateSubmissions = passedLessonSubmissions.filter(
      ({ challengeId }) => challengeId
    )
    const lessonProgress = updateSubmissions.length / challenges.length
    const progress = Math.floor(lessonProgress * 100)

    return { progress, order }
  })

  const profileLessons = lessons.map(({ order, title, challenges }: Lesson) => {
    const challengesStatus = challenges.map((c: Challenge) => {
      const challengeSubmission = userSubmissions.find(
        (s: UserSubmission) => c.id === s.challengeId
      )

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

  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { username },
  });

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  console.log(data)

  return (
    <Layout>
      <div className="row mt-4">
        <div className="col-4">
          <ProfileImageInfo user={userInfo} />
        </div>
        <div className="col-8">
          <ProfileLessons lessons={lessonInfo} />
          <ProfileSubmissions lessons={profileLessons} />
        </div>
      </div>
    </Layout>
  )
}

export default withQueryLoader<AppData>(
  {
    query: GET_APP
  },
  UserProfile
)
