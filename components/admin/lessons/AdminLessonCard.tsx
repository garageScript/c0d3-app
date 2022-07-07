import React from 'react'
import Link from 'next/link'
import styles from '../../../scss/adminLessonCard.module.scss'

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

type Props = {
  lesson: Lesson
  pendingFlaggedQuestions: number | string
}

export const AdminLessonCard: React.FC<Props> = ({
  lesson,
  pendingFlaggedQuestions
}) => {
  const { title, description, docUrl } = lesson

  return (
    <div className={styles.container}>
      <div className={styles.container__heading}>{title}</div>

      <div className={styles.container__description}>{description}</div>
      <div className={styles.container__flaggedQuestions}>
        {pendingFlaggedQuestions} Pending Questions
      </div>

      <Link href={docUrl || '_blank'}>
        <a data-testid="button">
          <button className={'btn btn-secondary ' + styles.container__button}>
            Edit Lesson
          </button>
        </a>
      </Link>
    </div>
  )
}

export default AdminLessonCard
