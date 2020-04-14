import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import { Lesson } from '../../@types/lesson'
import { UserSubmission } from '../../@types/challenge'
import { GET_LESSONS, GET_USER_SUBMISSIONS } from '../../graphql/queries'
// import useQueries from '../../helpers/useQueries'

type LessonId = {
  lessonId: string
  userId: string
}

type SubmissionVars = {
  in: LessonId
}
type UserSubmissionData = {
  userSubmissions: UserSubmission[]
}

const Challenges: React.FC = () => {
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const { loading, data } = useQuery(GET_LESSONS)
  const { loading: submissionDataLoading, data: userSubmissionData } = useQuery<
    UserSubmissionData,
    SubmissionVars
  >(GET_USER_SUBMISSIONS, {
    variables: {
      in: {
        lessonId: currentlessonId,
        userId: '1' //insert userId from context provider here
      }
    }
  })

  if (loading || submissionDataLoading) {
    return <h1>Loading</h1>
  }
  if (!data || !userSubmissionData) {
    return <h1>...</h1>
  }
  const { lessons }: { lessons: Lesson[] } = data
  const { userSubmissions } = userSubmissionData
  const sortedLessons: Lesson[] = lessons.sort((a, b) => a.order - b.order)
  const currentLesson = sortedLessons.find(
    lesson => currentlessonId === lesson.id.toString()
  )

  return (
    <div>
      <Layout>
        <div className="row mt-4">
          {currentLesson && (
            <div className="challenges-container">
              <LessonTitleCard
                lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
                lessonUrl={currentLesson.docUrl}
                lessonTitle={currentLesson.title}
              />
              <Alert
                icon="/curriculumAssets/icons/icon-tip.svg"
                text="Set up your computer to submit challenges."
                instructionsUrl="https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc"
              />
              <ChallengeMaterial
                challenges={currentLesson.challenges}
                userSubmissions={userSubmissions}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default Challenges
