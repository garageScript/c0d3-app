import styles from '../scss/mdx.module.scss'
import React from 'react'
import Link from 'next/link'
import { SubLesson } from '../helpers/static/lessons'

type Slugs = {
  lesson_slug: string
  sublesson_slug: string
}
type Props = {
  subLessons: SubLesson[]
} & Slugs
const SubLessonLinks: React.FC<Props> = ({
  subLessons,
  lesson_slug,
  sublesson_slug
}) => (
  <nav aria-label="Sub-lesson Links">
    {subLessons.map(subLesson => {
      const isSelected = subLesson.sublesson_slug === sublesson_slug
      return (
        <Link
          key={subLesson.sublesson_slug}
          href={`/curriculum/${lesson_slug}/${subLesson.sublesson_slug}`}
        >
          <a
            className={`${styles['subtitle']} ${
              isSelected ? `text-dark dark` : 'text-muted'
            } d-block`}
            aria-current={isSelected ? 'page' : undefined}
          >
            {`Part ${subLesson.frontMatter.order}: ${subLesson.frontMatter.title}`}
          </a>
        </Link>
      )
    })}
  </nav>
)

export default SubLessonLinks
