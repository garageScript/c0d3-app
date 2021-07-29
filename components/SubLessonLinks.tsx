import styles from '../scss/mdx.module.scss'
import React from 'react'
import Link from 'next/link'
import { SubLessonMeta } from '../pages/lesson/[lesson_slug]/[sublesson_slug]'

type Slugs = {
  lesson_slug: string
  sublesson_slug: string
}
type Props = {
  subLessonsMeta: SubLessonMeta[]
} & Slugs
const SubLessonLinks: React.FC<Props> = ({
  subLessonsMeta,
  lesson_slug,
  sublesson_slug
}) => (
  <>
    {subLessonsMeta.map(meta => (
      <Link
        key={meta.sublesson_slug}
        href={`/lesson/${lesson_slug}/${meta.sublesson_slug}`}
      >
        <a
          className={`${styles['subtitle']} ${
            meta.sublesson_slug === sublesson_slug
              ? `text-dark dark`
              : 'text-muted'
          } d-block`}
        >
          {`Part ${meta.frontMatter.order}: ${meta.frontMatter.title}`}
        </a>
      </Link>
    ))}
  </>
)

export default SubLessonLinks
