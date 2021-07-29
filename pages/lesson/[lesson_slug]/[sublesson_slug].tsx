import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getLayout } from '../../../components/LessonLayout'

import {
  getSubLessonMDXSource,
  SubLessonFrontMatter
} from '../../../helpers/static/getSubLessonMDXSource'
import { getAllSubLessonPaths } from '../../../helpers/static/getAllSubLessonPaths'
import { getLessonMetaData } from '../../../helpers/static/getLessonMetaData'
import NextPreviousLessons from '../../../components/NextPreviousLessons'
import SubLessonLinks from '../../../components/SubLessonLinks'
import styles from '../../../scss/mdx.module.scss'
import { WithLayout } from '../../../@types/page'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import MDXcomponents from '../../../helpers/mdxComponents'

export type SubLessonMeta = {
  frontMatter: SubLessonFrontMatter
  sublesson_slug: string
  lesson_slug: String
}

interface Props {
  selectedSubLesson: {
    source: MDXRemoteSerializeResult
    frontMatter: SubLessonFrontMatter
    sublesson_slug: string
  }
  lesson_slug: string
  sublesson_slug: string
  subLessonsMeta: SubLessonMeta[]
  metaData: {}
}

const Lesson: React.FC<Props> & WithLayout = ({
  selectedSubLesson,
  lesson_slug,
  sublesson_slug,
  subLessonsMeta
}) => {
  const hasMultipleSubLessons = subLessonsMeta.length > 1
  return (
    <div
      className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-3 p-md-4 bg-white`}
    >
      {hasMultipleSubLessons && (
        <SubLessonLinks
          subLessonsMeta={subLessonsMeta}
          lesson_slug={lesson_slug}
          sublesson_slug={sublesson_slug}
        />
      )}

      <MDXRemote {...selectedSubLesson.source} components={MDXcomponents} />

      {hasMultipleSubLessons && (
        <NextPreviousLessons
          subLessonsMeta={subLessonsMeta}
          sublesson_slug={sublesson_slug}
          lesson_slug={lesson_slug}
        />
      )}
    </div>
  )
}

Lesson.getLayout = getLayout

export default Lesson

interface Slugs extends ParsedUrlQuery {
  lesson_slug: string
  sublesson_slug: string
}

export const getStaticPaths: GetStaticPaths<Slugs> = async () => {
  const paths = await getAllSubLessonPaths()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<any, Slugs> = async context => {
  const { lesson_slug, sublesson_slug } = context.params ?? {}

  if (!lesson_slug || !sublesson_slug)
    throw new Error(
      `Missing Slug: "lesson_slug: ${lesson_slug}" "sublesson_slug: ${sublesson_slug}"`
    )

  const metaData = await getLessonMetaData(lesson_slug)
  const subLessonsMeta = await getSubLessonMDXSource({
    lesson_slug,
    onlyFront: true
  })

  const selectedSubLesson = (
    await getSubLessonMDXSource({
      lesson_slug,
      sublesson_slug
    })
  )[0]

  return {
    props: {
      lesson_slug,
      sublesson_slug,
      selectedSubLesson,
      subLessonsMeta,
      metaData // Consumed by LessonLayout
    }
  }
}
