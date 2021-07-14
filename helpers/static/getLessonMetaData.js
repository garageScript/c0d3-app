import fs from 'fs'
import path from 'path'
import { LESSONS_PATH } from './CONSTANTS'
export const getLessonMetaData = async slug => {
  const metaPath = path.join(LESSONS_PATH, slug, 'meta.json')
  const metaData = JSON.parse(fs.readFileSync(metaPath))

  return metaData
}
