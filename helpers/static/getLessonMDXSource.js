import path from 'path'
import { LESSONS_PATH } from './CONSTANTS'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
const slug = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')
export async function getLessonMDXSource(lesson_slug) {
  const fs = require('fs')
  const lessonFilePath = path.join(LESSONS_PATH, lesson_slug, 'lesson.mdx')
  const source = fs.readFileSync(lessonFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [slug, [toc, { maxDepth: 2 }], gfm],
      rehypePlugins: []
    },
    scope: data
  })

  return mdxSource
}
