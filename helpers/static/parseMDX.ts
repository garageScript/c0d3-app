import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'

const slug = require('remark-slug')
const toc = require('remark-toc')
const gfm = require('remark-gfm')

export type ParsedMDX = (fileContents: Buffer) => Promise<{
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: { [key: string]: any }
}>

export const parseMDX: ParsedMDX = async fileContents => {
  const { content, data } = matter(fileContents)

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [slug, [toc, { maxDepth: 2 }], gfm]
    }
  })

  return {
    frontMatter: data,
    source
  }
}
