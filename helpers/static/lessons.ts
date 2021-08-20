import fs from 'fs'
import path from 'path'

const LESSONS_GITHUB_PATH = 'content/lessons'
const LESSONS_PATH = path.join(process.cwd(), LESSONS_GITHUB_PATH)

export const getLessonSlugs = () =>
  fs.readdirSync(LESSONS_PATH).map(folder => {
    if (folder !== encodeURI(folder))
      throw Error(
        `Invalid lesson folder name: "${folder}", must be URI encoded characters`
      )
    return {
      lesson_slug: folder
    }
  })

export const getSubLessonSlugs = (lesson_slug?: string) => {
  if (lesson_slug && lesson_slug !== encodeURI(lesson_slug))
    throw Error(`lesson_slug: "${lesson_slug}", must be URI encoded: `)

  const lessonSlugs = lesson_slug ? [{ lesson_slug }] : getLessonSlugs()

  const subLessonSlugs = lessonSlugs.flatMap(({ lesson_slug }) => {
    const subLessonPath = path.join(LESSONS_PATH, lesson_slug, 'sublesson')
    const fileNames = fs.readdirSync(subLessonPath)

    return fileNames.map(file => {
      const sublesson_slug = file.replace(/\.mdx$/, '')

      if (sublesson_slug !== encodeURI(sublesson_slug))
        throw Error(
          `Invalid sublesson filename: "${sublesson_slug}", must be URI encoded characters`
        )

      return {
        lesson_slug,
        sublesson_slug
      }
    })
  })

  return subLessonSlugs
}

type Slugs = {
  lesson_slug: string
  sublesson_slug: string
}

export const getSubLessonGithubFilePath = ({
  lesson_slug,
  sublesson_slug
}: Slugs) =>
  path.join(
    LESSONS_GITHUB_PATH,
    lesson_slug,
    'sublesson',
    `${sublesson_slug}.mdx`
  )

export const getSubLessonContent = ({ lesson_slug, sublesson_slug }: Slugs) =>
  fs.readFileSync(
    path.join(LESSONS_PATH, lesson_slug, 'sublesson', `${sublesson_slug}.mdx`)
  )
