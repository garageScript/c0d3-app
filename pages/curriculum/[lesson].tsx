import * as React from 'react'
import { useRouter } from 'next/router'
import withQueryLoader, {
  WithQueryProps
} from '../../containers/withQueryLoader'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import { GET_APP } from '../../graphql/queries'
import _ from 'lodash'

const Challenges: React.FC<WithQueryProps> = ({ queryData }) => {
  const { lessons, session }: { lessons: any; session: any } = queryData
  const userSubmissions = _.get(session, 'submissions', [])
  const lessonStatus = _.get(session, 'lessonStatus', [])
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const currentLesson = lessons.find((lesson: any) => lesson.id === currentlessonId) 
  const currentLessonStatus = lessonStatus.find((lessonStatus: any) => lessonStatus.lessonId === currentlessonId) || { isEnrolled: null, isTeaching: null, lessonId: currentlessonId} 
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
                lessonStatus={currentLessonStatus}
                chatUrl={currentLesson.chatUrl}
                lessonId={currentLesson.id}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default withQueryLoader(
  {
    query: GET_APP
  },
  Challenges
)
