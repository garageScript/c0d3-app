import * as React from 'react'
import _ from 'lodash'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {
  Challenge,
  UserLesson,
  Submission,
  Star,
  SubmissionStatus
} from '../../graphql/index'
import { useUserInfoQuery } from '../../graphql/index'
import ProfileLessons from '../../components/ProfileLessons'
import ProfileImageInfo from '../../components/ProfileImageInfo'
import ProfileSubmissions, {
  LessonChallenge
} from '../../components/ProfileSubmissions'
import ProfileStarComments from '../../components/ProfileStarComments'
import LoadingSpinner from '../../components/LoadingSpinner'
import Error, { StatusCode } from '../../components/Error'

export type UserInfo = {
  username: string
  firstName: string
  lastName: string
}

type LessonStatusMap = {
  [id: string]: UserLesson
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
  const userSubmissions: Submission[] = _.get(data, 'userInfo.submissions', [])
  const profileLessons = (lessons || []).map(lessonInfo => {
    const lesson = lessonInfo || {}
    const { challenges } = lesson
    const challengeList = challenges || []
    const passedLessonSubmissions = userSubmissions.filter(
      ({ status, lessonId }) => {
        // TODO: Fix lesson.id and lessonId types
        return status === SubmissionStatus.Passed && lessonId === lesson.id
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
      const challenge = challengeInfo || ({} as Challenge)
      const challengeSubmission = userSubmissions.find(
        submission => challenge.id === Number(submission.challengeId)
      )

      return {
        challengeNumber: challenge.order || 0,
        challengeStatus: challengeSubmission?.status
      }
    })
    const lessonStatus: UserLesson[] = _.get(data, 'userInfo.lessonStatus', [])
    const lessonStatusMap: LessonStatusMap = lessonStatus.reduce(
      (map: LessonStatusMap, lesson: UserLesson) => {
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
    } as LessonChallenge
  })

  const lessonStatus: UserLesson[] = _.get(data, 'userInfo.lessonStatus', [])
  const validProfiles = lessonStatus.filter(
    ({ starsReceived }) => (starsReceived || []).length !== 0
  )
  const profileStars: Star[] = validProfiles.reduce(
    (acc, { starsReceived }) => {
      acc.push(...(starsReceived as Star[]))
      return acc
    },
    [] as Star[]
  )

  return (
    <Layout title={userInfo.username}>
      <div className="row mt-4">
        <div className="mb-3 mb-md-0 col-md-4">
          <ProfileImageInfo user={userInfo} />
          {profileStars.length === 0 ? null : (
            <ProfileStarComments stars={profileStars} />
          )}
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
