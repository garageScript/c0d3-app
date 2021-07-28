import React from 'react'
import Link from 'next/link'
import styles from '../scss/mdx.module.scss'
import { SubLessonMeta } from '../pages/lesson/[lesson_slug]/[sublesson_slug]'

type Props = {
  subLessonsMeta: SubLessonMeta[]
  sublesson_slug: string
  lesson_slug: string
}

const NextPreviousLessons: React.FC<Props> = ({
  subLessonsMeta,
  lesson_slug,
  sublesson_slug
}) => {
  const cur = subLessonsMeta.findIndex(
    subLesson => subLesson.sublesson_slug === sublesson_slug
  )

  const previous = subLessonsMeta[cur - 1]
  const next = subLessonsMeta[cur + 1]
  return (
    <div className="d-flex">
      {previous && (
        <Link href={`/lesson/${lesson_slug}/${previous.sublesson_slug}`}>
          <a className={`${styles['lessonLink']} ${styles['previous']}`}>
            Previous part: <span>{previous.frontMatter.title}</span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={`/lesson/${lesson_slug}/${next.sublesson_slug}`}>
          <a className={`${styles['lessonLink']} ${styles['next']}`}>
            Next part: <span>{next.frontMatter.title}</span>
          </a>
        </Link>
      )}
    </div>
  )
}

export default NextPreviousLessons
