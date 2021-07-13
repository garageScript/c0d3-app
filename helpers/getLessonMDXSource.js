import path from 'path'
import { LESSONS_PATH } from '../lib/CONSTANTS'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
const slug2 = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')
export async function getLessonMDXSource(slug) {
  const fs = require('fs')
  const lessonFilePath = path.join(LESSONS_PATH, slug, 'lesson.mdx')
  console.log(lessonFilePath)
  const source = fs.readFileSync(lessonFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [slug2, [toc, { maxDepth: 2 }], gfm],
      rehypePlugins: []
    },
    scope: data
  })

  // const source = 'Some **mdx** text, with a component'
  // const mdxSource = await serialize(source)
  console.log('thesourcest', mdxSource.compiledSource)
  return mdxSource
}
