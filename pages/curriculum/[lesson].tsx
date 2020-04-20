import * as React from 'react'
import { useRouter } from 'next/router'
import useSession from '../../helpers/useSession'
import withQueryLoader, {
  WithQueryProps
} from '../../containers/withQueryLoader'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import { GET_LESSON } from '../../graphql/queries'
import _ from 'lodash'

const Challenges: React.FC<WithQueryProps> = ({ queryData }) => {
  const { lessonInfo: currentLesson, userSubmissions } = queryData
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

export default withQueryLoader(
  {
    query: GET_LESSON,
    getParams: () => {
      const router = useRouter()
      const currentlessonId = router.query.lesson as string
      const { data } = useSession()
      const userId = _.get(data, 'userInfo.id', '').toString()
      return {
        variables: {
          lessonInfo: {
            id: currentlessonId
          },
          lessonUserInfo: {
            lessonId: currentlessonId,
            userId: userId
          }
        }
      }
    }
  },
  Challenges
)
