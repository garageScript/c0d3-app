import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import SessionContext from '../../helpers/contexts/session'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import { GET_LESSON } from '../../graphql/queries'
import LoadingSpinner from '../../components/LoadingSpinner'
import _ from 'lodash'

const Challenges: React.FC = () => {
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const { data: sessionData, error } = React.useContext(SessionContext)
  const userId = _.get(sessionData, 'userInfo.id', '').toString()
  const { loading, data } = useQuery(GET_LESSON, {
    variables: {
      lessonInfo: {
        id: currentlessonId
      },
      lessonUserInfo: {
        lessonId: currentlessonId,
        userId
      }
    }
  })

  if (loading) {
    return <LoadingSpinner />
  }
  if (!data || !userId || error) {
    return <h1>...</h1>
  }
  const { lessonInfo: currentLesson, userSubmissions } = data
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
