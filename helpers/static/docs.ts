import { promises as fs } from 'fs'
import { DOCS_PATH } from './CONSTANTS'
import path from 'path'

export const getDocSlugs = async () => {
  const files = await fs.readdir(DOCS_PATH)

  return files.map(file => ({ doc_slug: file.replace(/\.mdx$/, '') }))
}

export const getDocContent = (doc_slug: string) => {
  const filePath = path.join(DOCS_PATH, doc_slug + '.mdx')

  return fs.readFile(filePath)
}
