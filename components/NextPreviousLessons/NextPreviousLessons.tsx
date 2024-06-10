import React from 'react'
import Link from 'next/link'
import styles from './nextPreviousLessons.module.scss'
import { SubLesson } from '../../helpers/static/lessons'

type Props = {
  subLessons: SubLesson[]
  subLessonSlug: string
  lessonSlug: string
}

const NextPreviousLessons: React.FC<Props> = ({
  subLessons,
  lessonSlug,
  subLessonSlug
}) => {
  const cur = subLessons.findIndex(
    subLesson => subLesson.subLessonSlug === subLessonSlug
  )

  const previous = subLessons[cur - 1]
  const next = subLessons[cur + 1]
  return (
    <div className="d-flex">
      {previous && (
        <Link href={`/curriculum/${lessonSlug}/${previous.subLessonSlug}`}>
          <a className={`${styles['lessonLink']} ${styles['previous']}`}>
            Previous part: <span>{previous.frontMatter.title}</span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={`/curriculum/${lessonSlug}/${next.subLessonSlug}`}>
          <a className={`${styles['lessonLink']} ${styles['next']}`}>
            Next part: <span>{next.frontMatter.title}</span>
          </a>
        </Link>
      )}
    </div>
  )
}

export default NextPreviousLessons
