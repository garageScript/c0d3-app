import fs from 'fs'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import path from 'path'

const LESSONS_GITHUB_PATH = 'content/lessons'
const LESSONS_PATH = path.join(process.cwd(), LESSONS_GITHUB_PATH)

export type SubLesson = {
  frontMatter: {
    title: string
    order: number
  }
  source?: MDXRemoteSerializeResult
  subLessonSlug: string
}

export const getLessonSlugs = () =>
  fs.readdirSync(LESSONS_PATH).map(folder => {
    if (folder !== encodeURI(folder))
      throw Error(
        `Invalid lesson folder name: "${folder}", must be URI encoded characters`
      )
    return {
      lessonSlug: folder
    }
  })

export const getSubLessonSlugs = (lessonSlug?: string) => {
  if (lessonSlug && lessonSlug !== encodeURI(lessonSlug))
    throw Error(`lessonSlug: "${lessonSlug}", must be URI encoded: `)

  const lessonSlugs = lessonSlug ? [{ lessonSlug }] : getLessonSlugs()

  const subLessonSlugs = lessonSlugs.flatMap(({ lessonSlug }) => {
    const subLessonPath = path.join(LESSONS_PATH, lessonSlug, 'sublesson')
    const fileNames = fs.readdirSync(subLessonPath)

    return fileNames.map(file => {
      const subLessonSlug = file.replace(/\.mdx$/, '')

      if (subLessonSlug !== encodeURI(subLessonSlug))
        throw Error(
          `Invalid sublesson filename: "${subLessonSlug}", must be URI encoded characters`
        )

      return {
        lessonSlug,
        subLessonSlug
      }
    })
  })

  return subLessonSlugs
}

type Slugs = {
  lessonSlug: string
  subLessonSlug: string
}

export const getSubLessonGithubFilePath = ({
  lessonSlug,
  subLessonSlug
}: Slugs) =>
  path.join(
    LESSONS_GITHUB_PATH,
    lessonSlug,
    'sublesson',
    `${subLessonSlug}.mdx`
  )

export const getSubLessonContent = ({ lessonSlug, subLessonSlug }: Slugs) =>
  fs.readFileSync(
    path.join(LESSONS_PATH, lessonSlug, 'sublesson', `${subLessonSlug}.mdx`)
  )
