import React from 'react'
import Link from 'next/link'
import styles from '../../../scss/adminLessonCard.module.scss'
import { Lesson } from '../../../graphql/'

type Props = {
  lesson: Lesson
  pendingFlaggedQuestions: number
}

export const AdminLessonCard: React.FC<Props> = ({
  lesson,
  pendingFlaggedQuestions
}) => {
  const { title, description, docUrl } = lesson

  return (
    <div className={styles.container}>
      <div className={styles.container__heading}>{title}</div>

      <div className={styles.container__description}>
        {description} The Dojo is a space for you to store your coding journal
        and keep track of your learnings
      </div>
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
