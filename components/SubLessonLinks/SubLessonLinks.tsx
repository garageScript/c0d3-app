import styles from './subLessonLinks.module.scss'
import React from 'react'
import Link from 'next/link'
import { SubLesson } from '../../helpers/static/lessons'

type Slugs = {
  lessonSlug: string
  subLessonSlug: string
}
type Props = {
  subLessons: SubLesson[]
} & Slugs
const SubLessonLinks: React.FC<Props> = ({
  subLessons,
  lessonSlug,
  subLessonSlug
}) => (
  <nav aria-label="Sub-lesson Links">
    {subLessons.map(subLesson => {
      const isSelected = subLesson.subLessonSlug === subLessonSlug
      return (
        <Link
          key={subLesson.subLessonSlug}
          href={`/curriculum/${lessonSlug}/${subLesson.subLessonSlug}`}
        >
          <a
            className={`${styles['subtitle']} ${
              isSelected ? `link-dark dark` : 'text-muted'
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
