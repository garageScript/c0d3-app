import React from 'react'
import Link from 'next/link'
import styles from '../../../scss/adminLessonCard.module.scss'

type Props = {
  heading: string
  description: string
  pendingFlaggedQuestions: number
  editLessonUrl: string
  width?: string
  height?: string
}

export const AdminLessonCard: React.FC<Props> = ({
  heading,
  description,
  pendingFlaggedQuestions,
  editLessonUrl,
  width,
  height
}) => {
  return (
    <div
      className={styles.container}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <div className={styles.container__heading}>{heading}</div>

      <div className={styles.container__description}>
        {description} The Dojo is a space for you to store your coding journal
        and keep track of your learnings
      </div>
      <div className={styles.container__flaggedQuestions}>
        {pendingFlaggedQuestions} Pending Questions
      </div>

      <Link href={editLessonUrl}>
        <button
          className="btn btn-secondary"
          style={{ color: '#5440D8', fontWeight: 700 }}
        >
          Edit Lesson
        </button>
      </Link>
    </div>
  )
}

export default AdminLessonCard
