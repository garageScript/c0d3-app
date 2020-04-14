import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import { Lesson } from '../../@types/lesson'
import { GET_LESSONS } from '../../graphql/queries'

const Challenges: React.FC = () => {
  const router = useRouter()
  const { loading, data } = useQuery(GET_LESSONS)
  if (loading) {
    return <h1>Loading</h1>
  }
  if (!data) {
    return <h1>...</h1>
  }
  const { lessons }: { lessons: Lesson[] } = data
  const sortedLessons: Lesson[] = lessons.sort((a, b) => a.order - b.order)
  const currentLesson = sortedLessons.find(
    lesson => router.query.lesson === lesson.id.toString()
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
              <ChallengeMaterial challenges={currentLesson.challenges} />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default Challenges
