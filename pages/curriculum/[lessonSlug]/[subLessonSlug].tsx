import React, { PropsWithChildren, useState } from 'react'
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
import { initializeApollo } from '../../../helpers/apolloClient-server'

import NextPreviousLessons from '../../../components/NextPreviousLessons'
import SubLessonLinks from '../../../components/SubLessonLinks'
import EditPage from '../../../components/EditPage'
import MDXcomponents from '../../../helpers/mdxComponents'

import mdxStyles from '../../../scss/mdx.module.scss'
import styles from '../../../scss/subLessonSlug.module.scss'
import ScrollTopArrow from '../../../components/ScrollTopArrow'
import Title from '../../../components/Title'
import matter from 'gray-matter'
import useBreakpoint from '../../../helpers/useBreakpoint'
import { Accordion, Card, useAccordionButton } from 'react-bootstrap'

interface CustomToggleProps {
  eventKey: string
  breakpoint: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const CustomToggle: React.FC<PropsWithChildren<CustomToggleProps>> = ({
  children,
  eventKey,
  breakpoint,
  setToggle
}) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setToggle(prev => !prev)
  })

  return (
    <button
      type="button"
      onClick={ev => !breakpoint && decoratedOnClick(ev)}
      className={styles.toc__toggle}
      data-testid="accordion-toggle"
    >
      {children}
    </button>
  )
}

interface TableOfContentsProps {
  selectedSubLesson: SubLesson
  breakpoint: boolean
}
const TableOfContents: React.FC<TableOfContentsProps> = ({
  selectedSubLesson,
  breakpoint
}) => {
  const [toggle, setToggle] = useState(false)

  const mapHeadingsToLi = selectedSubLesson.headings.map((heading, i) => {
    const headingBookmark = heading.text.toLowerCase().replace(/\s/g, '-')

    return (
      <li
        key={heading.text + i}
        style={{ paddingLeft: `${heading.depth - 1}rem` }}
      >
        <a
          href={`#${headingBookmark}`}
          className={`${mdxStyles.MDX_a} text-decoration-none`}
        >
          {heading.text}
        </a>
      </li>
    )
  })

  // A workaround to prevent accordion from closing on mobile
  const activeKey = [breakpoint || toggle ? '0' : '-1']

  return (
    <div
      data-testid="toc"
      className={`card shadow-sm border-0 ${styles.sublesson__sidebar}`}
      style={{
        position: breakpoint ? 'sticky' : 'initial'
      }}
    >
      <Accordion alwaysOpen={breakpoint} activeKey={activeKey}>
        <Card className="border-0">
          <Card.Header
            className={`${breakpoint ? '' : 'py-3'} ${styles.toc__header}`}
          >
            <CustomToggle
              setToggle={setToggle}
              breakpoint={breakpoint}
              eventKey="0"
            >
              Table of Contents
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0" data-testid="accordion-collapse">
            <Card.Body className={`rounded ${styles.toc__container}`}>
              {mapHeadingsToLi}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

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
  const breakpoint = useBreakpoint('lg', 'up')

  const selectedSubLesson = subLessons[selectedSubLessonIndex] as SubLesson
  const hasMultipleSubLessons = subLessons.length > 1

  return (
    <div
      data-testid="sublesson__container"
      className={`mt-3 ${styles.sublesson__container}`}
      style={{
        gridTemplateColumns: breakpoint ? 'auto auto' : 'none'
      }}
    >
      <TableOfContents
        selectedSubLesson={selectedSubLesson as SubLesson}
        breakpoint={breakpoint}
      />
      <div
        className={`card shadow-sm  d-block border-0 p-3 p-md-4 bg-white ${mdxStyles['lesson-wrapper']} `}
      >
        <Title
          title={`${selectedSubLesson.frontMatter.title} | ${lessonSlug} | C0D3`}
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
        const source = await getSubLessonContent(slug)

        // Only include source data on selected subLesson
        const sourceAndFrontMatter = await parseMDX(
          source,
          slug.subLessonSlug !== subLessonSlug
        )

        const { content } = matter(source)
        const headings = [...content.matchAll(/^(#+)\s+(.*)$/gm)].map(
          ([, hashes, text]) => ({
            text,
            depth: hashes.length
          })
        )

        return {
          ...sourceAndFrontMatter,
          subLessonSlug: slug.subLessonSlug,
          headings
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
