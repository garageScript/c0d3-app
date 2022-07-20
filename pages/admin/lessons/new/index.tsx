import React from 'react'
import _ from 'lodash'
import {
  AdminLessonCard,
  LessonType
} from '../../../../components/admin/lessons/AdminLessonCard'
import {
  withGetApp,
  GetAppProps,
  useGetFlaggedExercisesQuery
} from '../../../../graphql'
import { AdminLayout } from '../../../../components/admin/AdminLayout'
import Link from 'next/link'
import styles from '../../../../scss/adminLessonPage.module.scss'

type LoadedLessonCardsProps = {
  lessonsData?: LessonType[]
}

const LoadedLessonCards = ({ lessonsData }: LoadedLessonCardsProps) => {
  const { data: exercisesData } = useGetFlaggedExercisesQuery()
  const exerciseMapping: { [key: string]: number } = {}
  const exercises = _.get(exercisesData, 'exercises', [])

  exercises.forEach(e => {
    const curTitle = _.get(e, 'module.lesson.title', undefined)
    if (e?.flaggedAt && curTitle)
      exerciseMapping[curTitle] = (exerciseMapping[curTitle] || 0) + 1
  })

  const lessonCardComponents = lessonsData?.map((e, i) => {
    return (
      <div key={i} className={styles.lessonCard}>
        <AdminLessonCard
          lesson={e}
          pendingFlaggedQuestions={exerciseMapping?.[e.title] || 0}
        />
      </div>
    )
  })

  return (
    <div className={styles.container__lessonCard}>{lessonCardComponents}</div>
  )
}

const Lessons: React.FC<GetAppProps> = ({ data }) => {
  const { lessons } = data

  return (
    <AdminLayout data={data}>
      <div className={styles.heading}>
        <span className={styles.lessonText}>Lessons</span>
        <span>
          <Link href="../../admin/lessons">
            <button className={`btn btn-primary ${styles.button}`}>
              Add New Lesson
            </button>
          </Link>
        </span>
      </div>
      <LoadedLessonCards lessonsData={lessons} />
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
