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
import NavLink from '../../components/NavLink'

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

  return (
    <Layout title={currentLesson.title}>
      <ExercisesNavCard lessonDocUrl={currentLesson.docUrl} lessonSlug={slug} />
      <h1>{currentLesson.title}</h1>
      {alerts && <AlertsDisplay alerts={alerts} />}
    </Layout>
  )
}

type ExercisesNavCardProps = {
  lessonDocUrl: string | null | undefined
  lessonSlug: string
}

const ExercisesNavCard = ({
  lessonDocUrl,
  lessonSlug
}: ExercisesNavCardProps) => {
  return (
    <div className="card shadow-sm d-inline-flex flex-row p-2 mb-4">
      {lessonDocUrl && (
        <NavLink
          path={lessonDocUrl}
          className="py-2 px-3 mx-1 fw-bold text-primary"
        >
          LESSONS
        </NavLink>
      )}
      <NavLink
        path={`/curriculum/${lessonSlug}`}
        className="py-2 px-3 mx-1 fw-bold text-primary"
      >
        CHALLENGES
      </NavLink>
      <div className="py-2 px-3 mx-1 fw-bold bg-primary text-white rounded">
        EXERCISES
      </div>
    </div>
  )
}

export default withQueryLoader<GetAppQuery>(
  {
    query: GET_APP
  },
  Exercises
)
