import * as React from 'react'
import _ from 'lodash'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { UserSubmission } from '../../@types/challenge'
import { useUserInfoQuery } from '../../graphql/index'
import ProfileLessons from '../../components/ProfileLessons'
import ProfileImageInfo from '../../components/ProfileImageInfo'
import ProfileSubmissions from '../../components/ProfileSubmissions'

export type UserInfo = {
  username: string
  firstName: string
  lastName: string
}

const UserProfile: React.FC = () => {
  const router = useRouter()
  const username = router.query.username as string
  const { loading, error, data } = useUserInfoQuery({
    variables: { username }
  })
  if (loading) return <h1>Loading</h1>
  if (error) return <h1>Error</h1>
  const { lessons } = data || {}
  const lessonsList = lessons || []
  console.log('data:', data)
  const fullname = _.get(data, 'userInfo.user.name', '')
  const userInfo: UserInfo = {
    username,
    firstName: fullname.split(' ')[0] || 'A',
    lastName: fullname.split(' ')[1] || ' '
  }
  const userSubmissions: UserSubmission[] = _.get(
    data,
    'userInfo.submissions',
    []
  )
  const profileLessons = (lessons || []).map(lessonInfo => {
    const lesson = lessonInfo || {}
    const { challenges } = lesson
    const challengeList = challenges || []
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
    const lessonProgress = updateSubmissions.length / challengeList.length
    const progress = Math.floor(lessonProgress * 100)
    return { progress, order: lesson.order || 0 }
  })

  const profileSubmissions = lessonsList.map(lessonInfo => {
    const lesson = lessonInfo || {}
    const challengeList = lesson.challenges || []
    const challengesStatus = challengeList.map(challengeInfo => {
      const challenge = challengeInfo || {}
      const challengeSubmission = userSubmissions.find(
        submission => challenge.id === submission.challengeId
      )

      return {
        challengeNumber: challenge.order || 0,
        challengeStatus: challengeSubmission
          ? challengeSubmission.status
          : 'open'
      }
    })

    return {
      order: lesson.order || 0,
      title: lesson.title || '',
      challenges: challengesStatus
    }
  })

  return (
    <Layout>
      <div className="row mt-4">
        <div className="col-4">
          <ProfileImageInfo user={userInfo} />
        </div>
        <div className="col-8">
          <ProfileLessons lessons={profileLessons} />
          <ProfileSubmissions lessons={profileSubmissions} />
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile
