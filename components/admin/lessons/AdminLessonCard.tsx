import React from 'react'
import Link from 'next/link'
import styles from '../../../scss/adminLessonCard.module.scss'
import { Lesson } from '../../../graphql'
import { ADMIN_PATH } from '../../../constants'

type optionalKeys<T> = {
  [P in keyof T]?: optionalKeys<T[P]>
}

type optionalKeysExcept<T, K extends keyof T> = optionalKeys<T> & Pick<T, K>

export type LessonType = optionalKeysExcept<Lesson, 'title'>

type Props = {
  lesson: LessonType
  pendingFlaggedQuestions: number
}

export const AdminLessonCard: React.FC<Props> = ({
  lesson,
  pendingFlaggedQuestions
}) => {
  const { title, description, slug } = lesson

  return (
    <div className={styles.container}>
      <div className={styles.container__heading}>{title}</div>

      <div className={styles.container__description}>{description}</div>
      <div className={styles.container__flaggedQuestions}>
        {pendingFlaggedQuestions} Pending Questions
      </div>

      <Link href={ADMIN_PATH + `/lessons/${slug}/introduction`}>
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
