import fs from 'fs'
import path from 'path'
import { LESSONS_PATH } from './CONSTANTS'

// TODO: Make type stricter (remove optional and or nulls)
export interface LessonMetaData {
  id: number
  title: string
  description: string
  docUrl?: string | null
  githubUrl?: string | null
  videoUrl?: string | null
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
