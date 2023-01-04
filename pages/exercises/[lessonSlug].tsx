import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import {
  GetExercisesQuery,
  useAddExerciseSubmissionMutation
} from '../../graphql'
import Error, { StatusCode } from '../../components/Error'
import LoadingSpinner from '../../components/LoadingSpinner'
import AlertsDisplay from '../../components/AlertsDisplay'
import ExercisePreviewCard, {
  ExercisePreviewCardProps
} from '../../components/ExercisePreviewCard'
import { NewButton } from '../../components/theme/Button'
import ExerciseCard, { Message } from '../../components/ExerciseCard'
import { ArrowLeftIcon } from '@primer/octicons-react'
import GET_EXERCISES from '../../graphql/queries/getExercises'
import styles from '../../scss/exercises.module.scss'
import LessonTabs from '../../components/LessonTabs'
import { LessonTab } from '../../components/LessonTabs/LessonTabs'

type ExerciseLesson = {
  title: string
  docUrl?: string | null
  slug: string
}

const Exercises: React.FC<QueryDataProps<GetExercisesQuery>> = ({
  queryData
}) => {
  const { lessons, alerts, exercises, exerciseSubmissions } = queryData
  const router = useRouter()
  const [solvingExercise, setSolvingExercise] = useState(false)
  const [hideAnswered, setHideAnswered] = useState(false)
  const [addExerciseSubmission] = useAddExerciseSubmissionMutation()
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  useEffect(() => {
    setUserAnswers(
      Object.fromEntries(
        exerciseSubmissions.map(submission => [
          submission.exerciseId,
          submission.userAnswer
        ])
      )
    )
  }, [exerciseSubmissions])

  if (!router.isReady) return <LoadingSpinner />

  const slug = router.query.lessonSlug as string
  if (!lessons || !alerts || !exercises || !exerciseSubmissions)
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />

  const currentLesson = lessons.find(lesson => lesson.slug === slug)
  if (!currentLesson)
    return <Error code={StatusCode.NOT_FOUND} message="Lesson not found" />

  const currentExercises = exercises
    .filter(
      exercise => exercise?.module.lesson.slug === slug && !exercise.removedAt
    )
    .map(exercise => {
      const userAnswer = userAnswers[exercise.id] ?? null
      return {
        id: exercise.id,
        moduleName: exercise.module.name,
        problem: exercise.description,
        answer: exercise.answer,
        explanation: exercise.explanation || '',
        userAnswer,
        state: ((): ExercisePreviewCardProps['state'] => {
          if (userAnswer === exercise.answer) return 'ANSWERED'
          if (userAnswer) return 'INCORRECT'
          return 'NOT ANSWERED'
        })(),
        removedAt: exercise.removedAt
      }
    })
    .filter(
      exercise => !hideAnswered || exercise.userAnswer !== exercise.answer
    )

  return (
    <Layout title={currentLesson.title}>
      {solvingExercise ? (
        <Exercise
          lessonTitle={currentLesson.title}
          exercises={currentExercises}
          onExit={localUserAnswers => {
            setUserAnswers({ ...userAnswers, ...localUserAnswers })
            setSolvingExercise(false)
          }}
          submitUserAnswer={(exerciseId, userAnswer) => {
            addExerciseSubmission({
              variables: { exerciseId, userAnswer }
            })
          }}
        />
      ) : (
        <ExerciseList
          onClickSolveExercises={() => setSolvingExercise(true)}
          lessonTitle={currentLesson.title}
          hideAnswered={hideAnswered}
          setHideAnswered={setHideAnswered}
          exercises={currentExercises}
          lesson={currentLesson}
        />
      )}
      {alerts && <AlertsDisplay alerts={alerts} />}
    </Layout>
  )
}

type ExerciseData = {
  id: number
  problem: string
  answer: string
  explanation: string
}

type ExerciseProps = {
  lessonTitle: string
  exercises: ExerciseData[]
  submitUserAnswer: (exerciseId: number, userAnswer: string) => void
  onExit: (newUserAnswers: Record<number, string>) => void
}

const Exercise = ({
  lessonTitle,
  exercises,
  submitUserAnswer,
  onExit
}: ExerciseProps) => {
  const [answerShown, setAnswerShown] = useState(false)
  const [message, setMessage] = useState(Message.EMPTY)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [newUserAnswers, setNewUserAnswers] = useState<Record<number, string>>(
    {}
  )
  const exercise = exercises[exerciseIndex]

  const hasPrevious = exerciseIndex > 0
  const hasNext = exerciseIndex < exercises.length - 1

  return (
    <div className={`mx-auto ${styles.exercise__container}`}>
      <button
        className="btn ps-0 d-flex align-items-center"
        onClick={() => onExit(newUserAnswers)}
      >
        <ArrowLeftIcon size="medium" aria-label="Exit" />
      </button>

      <h1 className="mb-4 fs-2">{lessonTitle}</h1>
      <ExerciseCard
        key={exercise.id}
        problem={exercise.problem}
        answer={exercise.answer}
        explanation={exercise.explanation}
        answerShown={answerShown}
        setAnswerShown={setAnswerShown}
        message={message}
        setMessage={setMessage}
        submitUserAnswer={userAnswer => {
          setNewUserAnswers({
            ...newUserAnswers,
            [exercise.id]: userAnswer
          })
          submitUserAnswer(exercise.id, userAnswer)
        }}
        exerciseId={exercise.id}
      />
      <div className="d-flex justify-content-between mt-4">
        {hasPrevious ? (
          <button
            onClick={() => {
              setExerciseIndex(i => i - 1)
              setAnswerShown(false)
              setMessage(Message.EMPTY)
            }}
            className="btn btn-outline-primary fw-bold px-4 py-2"
            style={{ fontFamily: 'PT Mono', fontSize: 14 }}
          >
            PREVIOUS
          </button>
        ) : (
          <div />
        )}
        {message === Message.SUCCESS ? (
          <NewButton
            onClick={() => {
              if (exerciseIndex === exercises.length - 1) {
                onExit(newUserAnswers)
              } else {
                setExerciseIndex(i => i + 1)
              }
              setAnswerShown(false)
              setMessage(Message.EMPTY)
            }}
          >
            NEXT QUESTION
          </NewButton>
        ) : hasNext ? (
          <button
            onClick={() => {
              setExerciseIndex(i => i + 1)
              setAnswerShown(false)
              setMessage(Message.EMPTY)
            }}
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

type ExerciseListItem = {
  moduleName: string
  problem: string
  answer: string
  userAnswer: string | null
  state: ExercisePreviewCardProps['state']
  id: number
  removedAt?: string | null
}

type ExerciseListProps = {
  onClickSolveExercises: () => void
  lessonTitle: string
  hideAnswered: boolean
  setHideAnswered: (hideAnswered: boolean) => void
  exercises: ExerciseListItem[]
  lesson: ExerciseLesson
}

const ExerciseList = ({
  onClickSolveExercises,
  lessonTitle,
  hideAnswered,
  setHideAnswered,
  exercises,
  lesson
}: ExerciseListProps) => {
  return (
    <>
      <div className="mb-4">
        <LessonTabs lesson={lesson} activeTab={LessonTab.EXERCISES} />
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="my-2 my-md-5">
          <h1 className="fs-2">{lessonTitle}</h1>
          <label className="d-inline-flex align-items-center">
            <input
              className="form-check-input m-0 me-3"
              type="checkbox"
              style={{ width: 30, height: 30 }}
              checked={hideAnswered}
              onChange={() => setHideAnswered(!hideAnswered)}
            />
            <span>Show incomplete exercises only</span>
          </label>
        </div>
        {exercises.length > 0 && (
          <div
            className={`mb-3 mb-md-0 d-flex d-md-block ${styles.exerciseList__solveExercisesButtonContainer}`}
          >
            <NewButton className="flex-grow-1" onClick={onClickSolveExercises}>
              SOLVE EXERCISES
            </NewButton>
          </div>
        )}
      </div>
      {exercises.length > 0 ? (
        <div className={styles.exerciseList__container}>
          {exercises.map((exercise, i) => (
            <ExercisePreviewCard
              key={i}
              moduleName={exercise.moduleName}
              state={exercise.state}
              problem={exercise.problem}
              id={exercise.id}
            />
          ))}
          <div />
          <div />
        </div>
      ) : (
        <p className="fs-5 text-center">
          🎉 Congratulations! You finished all the exercises for this lesson! 🥳
        </p>
      )}
    </>
  )
}

export default withQueryLoader<GetExercisesQuery>(
  {
    query: GET_EXERCISES
  },
  Exercises
)
