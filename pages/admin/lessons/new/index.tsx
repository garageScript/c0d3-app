import React from 'react'
import _ from 'lodash'
import { AdminLessonCard } from '../../../../components/admin/lessons/AdminLessonCard'
import {
  withGetApp,
  GetAppProps,
  useGetFlaggedExercisesQuery,
  GetFlaggedExercisesQuery
} from '../../../../graphql'
import { AdminLayout } from '../../../../components/admin/AdminLayout'
import Link from 'next/link'
import styles from '../../../../scss/adminLessonPage.module.scss'

type Lesson = {
  id: number
  title: string
  description: string
  docUrl?: string | null
  githubUrl?: string | null
  videoUrl?: string | null
  order: number
  slug: string
  chatUrl?: string | null
  challenges: Array<{
    id: number
    title: string
    description: string
    order: number
  }>
}

type LoadedLessonCardsProps = {
  lessonsData: Lesson[] | undefined
  exercisesData: GetFlaggedExercisesQuery | undefined
}

const LoadedLessonCards = ({
  lessonsData,
  exercisesData
}: LoadedLessonCardsProps) => {
  const exerciseMapping = exercisesData?.exercises.reduce(
    (acc: { [key: string]: number }, cur) => {
      const curTitle = _.get(cur, 'module.lesson.title', undefined)
      if (cur?.flaggedAt && curTitle) {
        if (!acc[curTitle]) {
          acc[curTitle] = 1
          return acc
        }
        acc[curTitle]++
      }
      return acc
    },
    {}
  )

  const lessonCardComponents = lessonsData?.map((e, i) => {
    return (
      <div key={i} className={styles.lessonCard}>
        <AdminLessonCard
          lesson={e}
          pendingFlaggedQuestions={exerciseMapping?.[e.title] || 'No'}
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
  const { data: exercisesData } = useGetFlaggedExercisesQuery()

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
      <LoadedLessonCards lessonsData={lessons} exercisesData={exercisesData} />
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
