import fs from 'fs'
import path from 'path'
import { LESSONS_PATH } from './CONSTANTS'

export interface LessonMetaData {
  id: number
  title: string
  description: string
  docUrl: string
  githubUrl: string
  viedoUrl: string
  order: number
}

// TODO: Research adding memoize to this function
export const getLessonMetaData = async (
  lesson_slug: string
): Promise<LessonMetaData> => {
  const metaPath = path.join(LESSONS_PATH, lesson_slug, 'meta.json')

  const metaData: LessonMetaData = JSON.parse(
    fs.readFileSync(metaPath).toString()
  )

  return metaData
}
