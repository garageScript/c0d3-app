import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'

const slug = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')

type ParsedMDX = {
  (fileContents: Buffer, onlyFront?: boolean): Promise<{
    source?: MDXRemoteSerializeResult<Record<string, unknown>>
    frontMatter: { [key: string]: any }
  }>
}

const getSource = (content: string) =>
  serialize(content, {
    mdxOptions: {
      remarkPlugins: [slug, [toc, { maxDepth: 2 }], gfm]
    }
  })

export const parseMDX: ParsedMDX = async (fileContents, onlyFront = false) => {
  const { content, data } = matter(fileContents)

  if (onlyFront) return { frontMatter: data }

  return {
    frontMatter: data,
    source: await getSource(content)
  }
}
