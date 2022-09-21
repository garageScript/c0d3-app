import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import { GetExercisesQuery } from '../../graphql'
import Error, { StatusCode } from '../../components/Error'
import LoadingSpinner from '../../components/LoadingSpinner'
import AlertsDisplay from '../../components/AlertsDisplay'
import NavCard from '../../components/NavCard'
import ExercisePreviewCard, {
  ExercisePreviewCardProps
} from '../../components/ExercisePreviewCard'
import { NewButton } from '../../components/theme/Button'
import ExerciseCard, { ExerciseCardProps } from '../../components/ExerciseCard'
import { ArrowLeftIcon } from '@primer/octicons-react'
import GET_EXERCISES from '../../graphql/queries/getExercises'

const exampleProblem = `const a = 5
a = a + 10
// what is a?`

const mockExercisePreviews: ExercisePreviewCardProps[] = [
  { moduleName: 'Variables', state: 'ANSWERED', problem: exampleProblem },
  { moduleName: 'Variables', state: 'NOT ANSWERED', problem: exampleProblem },
  { moduleName: 'Variables', state: 'ANSWERED', problem: exampleProblem }
]

const Exercises: React.FC<QueryDataProps<GetExercisesQuery>> = ({
  queryData
}) => {
  const { lessons, alerts, exercises } = queryData
  const router = useRouter()
  const [exerciseIndex, setExerciseIndex] = useState(-1)
  if (!router.isReady) return <LoadingSpinner />

  const slug = router.query.lessonSlug as string
  if (!lessons || !alerts || !exercises)
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

  const currentExercises = exercises
    .filter(exercise => exercise?.module.lesson.slug === slug)
    .map(exercise => ({
      challengeName: exercise?.module.name!,
      problem: exercise?.description!,
      answer: exercise?.answer!,
      explanation: exercise?.explanation!
    }))

  const exercise = currentExercises[exerciseIndex]

  return (
    <Layout title={currentLesson.title}>
      {exercise ? (
        <Exercise
          exercise={exercise}
          setExerciseIndex={setExerciseIndex}
          lessonTitle={currentLesson.title}
          showPreviousButton={exerciseIndex > 0}
          showSkipButton={exerciseIndex < currentExercises.length - 1}
        />
      ) : (
        <ExerciseList
          tabs={tabs}
          setExerciseIndex={setExerciseIndex}
          lessonTitle={currentLesson.title}
        />
      )}
      {alerts && <AlertsDisplay alerts={alerts} />}
    </Layout>
  )
}

type ExerciseProps = {
  exercise: ExerciseCardProps
  setExerciseIndex: React.Dispatch<React.SetStateAction<number>>
  lessonTitle: string
  showPreviousButton: boolean
  showSkipButton: boolean
}

const Exercise = ({
  exercise,
  setExerciseIndex,
  lessonTitle,
  showPreviousButton,
  showSkipButton
}: ExerciseProps) => {
  return (
    <div className="w-75 mx-auto">
      <button
        className="btn ps-0 d-flex align-items-center"
        onClick={() => setExerciseIndex(-1)}
      >
        <ArrowLeftIcon size="medium" aria-label="Exit" />
      </button>

      <h1 className="mb-4 fs-2">{lessonTitle}</h1>
      <ExerciseCard
        challengeName={exercise.challengeName}
        problem={exercise.problem}
        answer={exercise.answer}
        explanation={exercise.explanation}
      />
      <div className="d-flex justify-content-between mt-4">
        {showPreviousButton ? (
          <button
            onClick={() => setExerciseIndex(i => i - 1)}
            className="btn btn-outline-primary fw-bold px-4 py-2"
            style={{ fontFamily: 'PT Mono', fontSize: 14 }}
          >
            PREVIOUS
          </button>
        ) : (
          <div />
        )}
        {showSkipButton ? (
          <button
            onClick={() => setExerciseIndex(i => i + 1)}
            className="btn btn-outline-primary fw-bold px-4 py-2"
            style={{ fontFamily: 'PT Mono', fontSize: 14 }}
          >
            SKIP
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

type ExerciseListProps = {
  tabs: { text: string; url: string }[]
  setExerciseIndex: React.Dispatch<React.SetStateAction<number>>
  lessonTitle: string
}

const ExerciseList = ({
  tabs,
  setExerciseIndex,
  lessonTitle
}: ExerciseListProps) => {
  return (
    <>
      <div className="mb-4">
        <NavCard
          tabSelected={tabs.findIndex(tab => tab.text === 'exercises')}
          tabs={tabs}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-5 fs-2">{lessonTitle}</h1>
        <NewButton onClick={() => setExerciseIndex(0)}>
          SOLVE EXERCISES
        </NewButton>
      </div>
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
    </>
  )
}

export default withQueryLoader<GetExercisesQuery>(
  {
    query: GET_EXERCISES
  },
  Exercises
)
