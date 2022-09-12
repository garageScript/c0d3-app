import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import { GetAppQuery } from '../../graphql'
import Error, { StatusCode } from '../../components/Error'
import LoadingSpinner from '../../components/LoadingSpinner'
import GET_APP from '../../graphql/queries/getApp'
import AlertsDisplay from '../../components/AlertsDisplay'
import NavCard from '../../components/NavCard'
import ExercisePreviewCard, {
  ExercisePreviewCardProps
} from '../../components/ExercisePreviewCard'

const exampleProblem = `const a = 5
a = a + 10
// what is a?`

const mockExercisePreviews: ExercisePreviewCardProps[] = [
  { moduleName: 'Variables', state: 'ANSWERED', problem: exampleProblem },
  { moduleName: 'Variables', state: 'NOT ANSWERED', problem: exampleProblem },
  { moduleName: 'Variables', state: 'ANSWERED', problem: exampleProblem }
]

const Exercises: React.FC<QueryDataProps<GetAppQuery>> = ({ queryData }) => {
  const { lessons, alerts } = queryData
  const router = useRouter()
  if (!router.isReady) return <LoadingSpinner />

  const slug = router.query.lessonSlug as string
  if (!lessons || !alerts)
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />

  const currentLesson = lessons.find(lesson => lesson.slug === slug)
  if (!currentLesson)
    return <Error code={StatusCode.NOT_FOUND} message="Lesson not found" />

  const tabs = [
    ...(currentLesson.docUrl
      ? [{ text: 'lessons', url: currentLesson.docUrl }]
      : []),
    { text: 'challenges', url: `/curriculum/${currentLesson.slug}` },
    { text: 'exercises', url: `/exercises/${currentLesson.slug}` }
  ]

  return (
    <Layout title={currentLesson.title}>
      <NavCard
        tabSelected={tabs.findIndex(tab => tab.text === 'exercises')}
        tabs={tabs}
      />
      <h1 className="my-4">{currentLesson.title}</h1>
      {alerts && <AlertsDisplay alerts={alerts} />}
      <div className="container">
        <div className="row">
          {mockExercisePreviews.map((exercisePreview, i) => (
            <ExercisePreviewCard
              key={i}
              moduleName={exercisePreview.moduleName}
              state={exercisePreview.state}
              problem={exercisePreview.problem}
              className={`col ${
                i < mockExercisePreviews.length - 1 ? 'me-4' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default withQueryLoader<GetAppQuery>(
  {
    query: GET_APP
  },
  Exercises
)
