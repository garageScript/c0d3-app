import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import { GET_LESSONS } from '../../graphql/queries'
import { Challenge } from '../../@types/challenge'

type Lesson = {
  id: number
  title: string
  description: string
  order: number
  challenges: Challenge[]
  docUrl: string
}

const Challenges: React.FC = () => {
  const router = useRouter()
  const { loading, data } = useQuery(GET_LESSONS)
  if (loading) {
    return <h1>Loading</h1>
  }
  if (data) {
    const { lessons }: { lessons: Lesson[] } = data
    const sortedLessons: Lesson[] = lessons.sort((a, b) => a.order - b.order)
    const lessonId = router.query.lesson
    const lessonIdx = sortedLessons.findIndex(
      lesson => lessonId === lesson.id.toString()
    )
    const currentLesson = sortedLessons[lessonIdx]
    return (
      <div>
        <Layout>
          <div className="row mt-4">
            <LessonTitleCard
              lessonCoverUrl={`js-${lessonIdx}-cover.svg`}
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
        </Layout>
      </div>
    )
  }
  return <h1>...</h1>
}

export default Challenges
