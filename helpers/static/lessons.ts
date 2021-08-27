import { promises as fs } from 'fs'
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

const isURIEncodedOrThrow = (errorPrefix: string, slug: string) => {
  if (slug !== encodeURI(slug))
    throw Error(`${errorPrefix}: "${slug}", must be URI encoded: `)
  return true
}

export const getLessonSlugs = async () => {
  const folderNames = await fs.readdir(LESSONS_PATH)

  return folderNames.map(folder => {
    isURIEncodedOrThrow('Invalid lesson folder name', folder)

    return {
      lessonSlug: folder
    }
  })
}

export const getSubLessonSlugs = async (lessonSlug?: string) => {
  lessonSlug && isURIEncodedOrThrow('Invalid lessonSlug', lessonSlug)

  const lessonSlugs = lessonSlug ? [{ lessonSlug }] : await getLessonSlugs()

  const subLessonSlugsPromises = lessonSlugs.map(async ({ lessonSlug }) => {
    const subLessonPath = path.join(LESSONS_PATH, lessonSlug, 'sublesson')
    const fileNames = await fs.readdir(subLessonPath)

    return fileNames.map(file => {
      const subLessonSlug = file.replace(/\.mdx$/, '')
      isURIEncodedOrThrow('Invalid subLesson filename', subLessonSlug)

      return {
        lessonSlug,
        subLessonSlug
      }
    })
  })

  return (await Promise.all(subLessonSlugsPromises)).flat()
}

type Slugs = {
  lessonSlug: string
  subLessonSlug: string
}

export const getSubLessonGithubFilePath = ({
  lessonSlug,
  subLessonSlug
}: Slugs) =>
  `${LESSONS_GITHUB_PATH}/${lessonSlug}/sublesson/${subLessonSlug}.mdx`

export const getSubLessonContent = ({ lessonSlug, subLessonSlug }: Slugs) =>
  fs.readFile(
    path.join(LESSONS_PATH, lessonSlug, 'sublesson', `${subLessonSlug}.mdx`)
  )
