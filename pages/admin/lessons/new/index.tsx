import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { AdminLessonCard } from '../../../../components/admin/lessons/AdminLessonCard'
import { withGetApp, GetAppProps } from '../../../../graphql'
import { AdminLayout } from '../../../../components/admin/AdminLayout'
import Link from 'next/link'
import styles from '../../../../scss/adminLessonPage.module.scss'

const EXERCISES = gql`
  query {
    exercises {
      flaggedAt
      module {
        lesson {
          title
        }
      }
    }
  }
`
type Exercise = {
  flaggedAt?: string
  module: {
    lesson: {
      title: string
    }
  }
}

type Exercises = Exercise[]

const Lessons: React.FC<GetAppProps> = ({ data }) => {
  const { lessons } = data
  const [lessonCards, setCards] = useState<[]>([])
  const [getExercises, { data: exercisesData }] = useLazyQuery<{
    exercises: Exercises
  }>(EXERCISES, {
    onCompleted: async () => {
      const exerciseMapping = await exercisesData?.exercises.reduce(
        (prev: any, cur) => {
          if (cur.flaggedAt) {
            if (!prev[cur.module?.lesson?.title]) {
              prev[cur.module?.lesson?.title] = 1
              return prev
            }
            prev[cur.module?.lesson?.title]++
          }

          return prev
        },
        {}
      )

      setCards(
        lessons?.reduce((prev: any, cur: any, i) => {
          prev.push(
            <div key={i} className={styles.lessonCard}>
              <AdminLessonCard
                lesson={cur}
                pendingFlaggedQuestions={
                  exerciseMapping[cur.title] ? exerciseMapping[cur.title] : 'No'
                }
              />
            </div>
          )
          return prev
        }, [])
      )
    }
  })

  React.useEffect(() => {
    lessons && getExercises()
  }, [lessons, exercisesData])

  return (
    <AdminLayout data={data} title="Admin Lessons Homepage">
      <div className={styles.heading}>
        <span className={styles.lessonText}>Lessons</span>
        <span>
          <Link href={'../../admin/lessons'}>
            <button className={`btn btn-primary ${styles.button}`}>
              Add New Lesson
            </button>
          </Link>
        </span>
      </div>

      <div className={styles.container__lessonCard__outer}>
        <div className={styles.container__lessonCard__inner}>{lessonCards}</div>
      </div>
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
