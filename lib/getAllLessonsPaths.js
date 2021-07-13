import fs from 'fs'

import { LESSONS_PATH } from './CONSTANTS'

export function getAllLessonPaths() {
  const fileNames = fs.readdirSync(LESSONS_PATH, { withFileTypes: true })
  console.log(fileNames)
  return fileNames
    .filter(file => file.isDirectory())
    .map(file => {
      return {
        params: {
          slug: file.name
        }
      }
    })
}
