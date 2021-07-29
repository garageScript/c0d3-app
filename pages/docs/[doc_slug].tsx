import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getLayout } from '../../components/Layout'

import styles from '../../scss/mdx.module.scss'
import { WithLayout } from '../../@types/page'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Title from '../../components/Title'
import { getDocSlugs, getDocContent } from '../../helpers/static/docs'
import { parseMDX } from '../../helpers/static/parseMDX'
import MDXcomponents from '../../helpers/mdxComponents'

interface Props {
  source: MDXRemoteSerializeResult
  frontMatter: { title?: string }
}

const Lesson: React.FC<Props> & WithLayout = ({ source, frontMatter }) => {
  return (
    <div
      className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-3 p-md-4 bg-white`}
    >
      <Title title={`C0D3 | ${frontMatter?.title ?? 'Docs'}`} />
      <MDXRemote {...source} components={MDXcomponents}></MDXRemote>
    </div>
  )
}

Lesson.getLayout = getLayout

export default Lesson

interface Slugs extends ParsedUrlQuery {
  doc_slug: string
}

export const getStaticPaths: GetStaticPaths<Slugs> = async () => {
  const slugs = await getDocSlugs()

  return {
    paths: slugs.map(slug => ({ params: slug })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<any, Slugs> = async context => {
  const { doc_slug } = context.params ?? {}

  if (!doc_slug) throw new Error(`Missing Slug: "doc_slug: ${doc_slug}"`)

  const docContents = await getDocContent(doc_slug)

  const { source, frontMatter } = await parseMDX(docContents)

  return {
    props: {
      source,
      frontMatter
    }
  }
}
