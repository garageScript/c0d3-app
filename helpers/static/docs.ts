import fs from 'fs'
import path from 'path'

const DOCS_GITHUB_PATH = 'content/docs'
export const DOCS_PATH = path.join(process.cwd(), DOCS_GITHUB_PATH)

export const getDocSlugs = () =>
  fs.readdirSync(DOCS_PATH).map(file => {
    const doc_slug = file.replace(/\.mdx$/, '')

    if (doc_slug !== encodeURI(doc_slug))
      throw Error(
        `Invalid document filename: "${doc_slug}", must be URI encoded characters`
      )

    return { doc_slug }
  })

export const getDocGithubFilePath = (doc_slug: string) =>
  path.join(DOCS_GITHUB_PATH, doc_slug + '.mdx')

export const getDocContent = (doc_slug: string) => {
  const filePath = path.join(DOCS_PATH, doc_slug + '.mdx')
  return fs.readFileSync(filePath)
}
