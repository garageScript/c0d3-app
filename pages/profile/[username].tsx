import * as React from 'react'
import _ from 'lodash'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { UserSubmission } from '../../@types/challenge'
import { LessonStatus } from '../../@types/lesson'
import { useUserInfoQuery } from '../../graphql/index'
import ProfileLessons from '../../components/ProfileLessons'
import ProfileImageInfo from '../../components/ProfileImageInfo'
import ProfileSubmissions from '../../components/ProfileSubmissions'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Star } from '../../@types/lesson'
import Error, { StatusCode } from '../../components/Error'

export type UserInfo = {
  username: string
  firstName: string
  lastName: string
}

type LessonStatusMap = {
  [id: string]: LessonStatus
}

const UserProfile: React.FC = () => {
  const router = useRouter()
  const username = router.query.username as string
  const { loading, error, data } = useUserInfoQuery({
    variables: { username }
  })
  if (loading) {
    return <LoadingSpinner />
  }
  if (error) {
    return (
      <Error
        code={StatusCode.INTERNAL_SERVER_ERROR}
        message="Internal server error"
      />
    )
  }
  const { lessons } = data || {}
  const lessonsList = lessons || []

  const fullname = _.get(data, 'userInfo.user.name', '')
  const userInfo: UserInfo = {
    // 'A' stands for Anonymous, in case user did not put in full name
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
    const completedSubmissions = passedLessonSubmissions.filter(
      ({ challengeId }) => challengeId
    )
    const lessonProgress = completedSubmissions.length / challengeList.length
    const progress = Math.floor(lessonProgress * 100)
    return {
      progress,
      order: lesson.order || 0
    }
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
    const lessonStatus: LessonStatus[] = _.get(
      data,
      'userInfo.lessonStatus',
      []
    )
    const lessonStatusMap: LessonStatusMap = lessonStatus.reduce(
      (map: LessonStatusMap, lesson: LessonStatus) => {
        //https://stackoverflow.com/questions/46043087/type-null-cannot-be-used-as-an-index-type
        map[String(lesson.lessonId)] = lesson
        return map
      },
      {}
    )
    let starsReceived = [] as Star[]
    if (lessonStatusMap[String(lesson.id)]) {
      starsReceived = lessonStatusMap[String(lesson.id)].starsReceived as Star[]
    }

    return {
      order: lesson.order || 0,
      title: lesson.title || '',
      challenges: challengesStatus,
      starsReceived
    }
  })

  return (
    <Layout>
      <div className="row mt-4">
        <div className="mb-3 mb-md-0 col-md-4">
          <ProfileImageInfo user={userInfo} />
        </div>
        <div className="col-md-8">
          <ProfileLessons lessons={profileLessons} />
          <ProfileSubmissions lessons={profileSubmissions} />
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile
