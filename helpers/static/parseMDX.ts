import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import autolink from 'rehype-autolink-headings'

type ParsedMDX = {
  (
    fileContents: Buffer,
    onlyFront?: boolean
  ): Promise<{
    source?: MDXRemoteSerializeResult<Record<string, unknown>>
    frontMatter: { [key: string]: any }
  }>
}

const getSource = (content: string) =>
  serialize(content, {
    mdxOptions: {
      remarkPlugins: [slug, gfm],
      rehypePlugins: [autolink]
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
