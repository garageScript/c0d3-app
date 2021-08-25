import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getLayout } from '../../../components/LessonLayout'
import { WithLayout } from '../../../@types/page'
import { GetLessonsDocument, GetLessonsQuery } from '../../../graphql'

import {
  getSubLessonSlugs,
  getSubLessonContent,
  getSubLessonGithubFilePath,
  SubLesson
} from '../../../helpers/static/lessons'
import { parseMDX } from '../../../helpers/static/parseMDX'
import { initializeApollo } from '../../../helpers/apolloClient'

import NextPreviousLessons from '../../../components/NextPreviousLessons'
import SubLessonLinks from '../../../components/SubLessonLinks'
import EditPage from '../../../components/EditPage'
import MDXcomponents from '../../../helpers/mdxComponents'

import styles from '../../../scss/mdx.module.scss'
import ScrollTopArrow from '../../../components/ScrollTopArrow'
import Title from '../../../components/Title'

interface Props {
  selectedSubLessonIndex: number
  lessonSlug: string
  subLessonSlug: string
  lesson: Omit<GetLessonsQuery['lessons'], 'challenges'>
  subLessons: SubLesson[]
  githubFilePath: string
}
const SubLessonPage: React.FC<Props> & WithLayout = ({
  selectedSubLessonIndex,
  lessonSlug,
  subLessonSlug,
  subLessons,
  githubFilePath
}) => {
  const selectedSubLesson = subLessons[selectedSubLessonIndex] as SubLesson

  const hasMultipleSubLessons = subLessons.length > 1
  return (
    <div
      className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-3 p-md-4 bg-white`}
    >
      <Title
        title={`${selectedSubLesson.frontMatter.title} | ${subLessonSlug} | C0D3`}
      />
      <ScrollTopArrow />
      {hasMultipleSubLessons && (
        <SubLessonLinks
          subLessons={subLessons}
          lessonSlug={lessonSlug}
          subLessonSlug={subLessonSlug}
        />
      )}

      <MDXRemote {...selectedSubLesson.source!} components={MDXcomponents} />

      {hasMultipleSubLessons && (
        <NextPreviousLessons
          subLessons={subLessons}
          subLessonSlug={subLessonSlug}
          lessonSlug={lessonSlug}
        />
      )}

      <EditPage filePath={githubFilePath} />
    </div>
  )
}

SubLessonPage.getLayout = getLayout
export default SubLessonPage

interface Slugs extends ParsedUrlQuery {
  lessonSlug: string
  subLessonSlug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getSubLessonSlugs()).map(slugs => {
    if (!slugs.lessonSlug || !slugs.subLessonSlug)
      throw Error(
        `Retrieved invalid Slug names
         Expecting: lessonSlug & subLessonSlug
         Received: ${JSON.stringify(slugs)}`
      )
    return {
      params: slugs
    }
  })

  return {
    paths,
    fallback: false
  }
}

const FIVE_MINUTES = 5 * 60

export const getStaticProps: GetStaticProps<any, Slugs> = async context => {
  const { lessonSlug, subLessonSlug } = context.params!
  if (!lessonSlug || !subLessonSlug)
    throw new Error(
      `Missing Slug: "lessonSlug: ${lessonSlug}" "subLessonSlug: ${subLessonSlug}"`
    )

  const githubFilePath = getSubLessonGithubFilePath({
    lessonSlug,
    subLessonSlug
  })

  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetLessonsQuery>({
    query: GetLessonsDocument
  })

  // TODO: Make type without challenge material, challenge page refetches it and is currently unused data
  const lesson = query.data.lessons.find(lesson => lesson.slug === lessonSlug)
  if (!lesson)
    throw new Error(`Could not find lesson with lessonSlug ${lessonSlug}`)
  const { challenges, ...lessonNoChallenges } = lesson

  const slugs = await getSubLessonSlugs(lessonSlug)

  const subLessons = (
    await Promise.all(
      slugs.map(async slug => {
        // Only include source data on selected subLesson
        const sourceAndFrontMatter = await parseMDX(
          await getSubLessonContent(slug),
          slug.subLessonSlug !== subLessonSlug
        )

        return {
          ...sourceAndFrontMatter,
          subLessonSlug: slug.subLessonSlug
        }
      })
    )
  ).sort((a, b) => a.frontMatter.order - b.frontMatter.order)

  const selectedSubLessonIndex = subLessons.findIndex(
    subLesson => subLesson.subLessonSlug === subLessonSlug
  )

  return {
    props: {
      lessonSlug,
      subLessonSlug,
      selectedSubLessonIndex,
      lesson: lessonNoChallenges, // Consumed by LessonLayout
      subLessons,
      githubFilePath
    },
    revalidate: FIVE_MINUTES
  }
}
