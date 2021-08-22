import React from 'react'
import Link from 'next/link'
import styles from '../scss/mdx.module.scss'
import { SubLesson } from '../helpers/static/lessons'

type Props = {
  subLessons: SubLesson[]
  sublesson_slug: string
  lesson_slug: string
}

const NextPreviousLessons: React.FC<Props> = ({
  subLessons,
  lesson_slug,
  sublesson_slug
}) => {
  const cur = subLessons.findIndex(
    subLesson => subLesson.sublesson_slug === sublesson_slug
  )

  const previous = subLessons[cur - 1]
  const next = subLessons[cur + 1]
  return (
    <div className="d-flex">
      {previous && (
        <Link href={`/curriculum/${lesson_slug}/${previous.sublesson_slug}`}>
          <a className={`${styles['lessonLink']} ${styles['previous']}`}>
            Previous part: <span>{previous.frontMatter.title}</span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={`/curriculum/${lesson_slug}/${next.sublesson_slug}`}>
          <a className={`${styles['lessonLink']} ${styles['next']}`}>
            Next part: <span>{next.frontMatter.title}</span>
          </a>
        </Link>
      )}
    </div>
  )
}

export default NextPreviousLessons
