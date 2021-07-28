import fs from 'fs'
import path from 'path'
import { LESSONS_PATH } from './CONSTANTS'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import { getAllSubLessonPaths } from './getAllSubLessonPaths'

const slug = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')

export interface SubLessonFrontMatter {
  title: string
  order: number
}

interface inputs {
  lesson_slug: string
  sublesson_slug?: string
  onlyFront?: boolean
}

export async function getSubLessonMDXSource({
  lesson_slug,
  sublesson_slug,
  onlyFront = false
}: inputs) {
  const subLessonPaths = sublesson_slug
    ? [{ params: { lesson_slug, sublesson_slug } }]
    : await getAllSubLessonPaths(lesson_slug)

  const subLessonsSourceAndFrontMatter = await Promise.all(
    subLessonPaths.map(async ({ params: { lesson_slug, sublesson_slug } }) => {
      const fileContents = fs.readFileSync(
        path.join(
          LESSONS_PATH,
          lesson_slug,
          'sublesson',
          `${sublesson_slug}.mdx`
        )
      )
      const { content, data } = matter(fileContents)

      const source = onlyFront
        ? null
        : await serialize(content, {
            mdxOptions: {
              remarkPlugins: [slug, [toc, { maxDepth: 2 }], gfm]
            }
          })

      return {
        source,
        frontMatter: data as SubLessonFrontMatter,
        sublesson_slug
      }
    })
  )

  return subLessonsSourceAndFrontMatter.sort(
    (a, b) => a.frontMatter.order - b.frontMatter.order
  )
}
