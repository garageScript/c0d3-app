import fs from 'fs'
import path from 'path'

const DOCS_GITHUB_PATH = 'content/docs'
export const DOCS_PATH = path.join(process.cwd(), DOCS_GITHUB_PATH)

export const getDocSlugs = () =>
  fs.readdirSync(DOCS_PATH).map(file => {
    const docSlug = file.replace(/\.mdx$/, '')

    if (docSlug !== encodeURI(docSlug))
      throw Error(
        `Invalid document filename: "${docSlug}", must be URI encoded characters`
      )

    return { docSlug }
  })

export const getDocGithubFilePath = (docSlug: string) =>
  path.join(DOCS_GITHUB_PATH, docSlug + '.mdx')

export const getDocContent = (docSlug: string) => {
  const filePath = path.join(DOCS_PATH, docSlug + '.mdx')
  return fs.readFileSync(filePath)
}
