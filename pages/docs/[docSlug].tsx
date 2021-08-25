import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getLayout } from '../../components/Layout'

import { WithLayout } from '../../@types/page'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Title from '../../components/Title'
import {
  getDocSlugs,
  getDocContent,
  getDocGithubFilePath
} from '../../helpers/static/docs'
import { parseMDX } from '../../helpers/static/parseMDX'
import MDXcomponents from '../../helpers/mdxComponents'
import { useRouter } from 'next/router'
import styles from '../../scss/mdx.module.scss'
import EditPage from '../../components/EditPage'
interface Props {
  source: MDXRemoteSerializeResult
  frontMatter: { title?: string }
  docFilePath: string
}

const Docs: React.FC<Props> & WithLayout = ({
  source,
  frontMatter,
  docFilePath
}) => {
  const router = useRouter()
  return (
    <div
      className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-3 p-md-4 bg-white`}
    >
      <Title title={`C0D3 | ${frontMatter?.title ?? 'Docs'}`} />

      <button
        className="btn btn-link text-primary p-0"
        onClick={() => router.back()}
      >
        Go Back
      </button>

      {frontMatter.title && (
        <div className={styles.title}>{frontMatter.title}</div>
      )}

      <MDXRemote {...source} components={MDXcomponents}></MDXRemote>
      <EditPage filePath={docFilePath} />
    </div>
  )
}

Docs.getLayout = getLayout

export default Docs

interface Slugs extends ParsedUrlQuery {
  docSlug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getDocSlugs()

  return {
    paths: slugs.map(slug => ({ params: slug })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<any, Slugs> = async context => {
  const { docSlug } = context.params!

  if (!docSlug) throw new Error(`Missing Slug: "docSlug: ${docSlug}"`)
  const docFilePath = getDocGithubFilePath(docSlug)
  const docContents = await getDocContent(docSlug)

  const { source, frontMatter } = await parseMDX(docContents)
  return {
    props: {
      source,
      frontMatter,
      docFilePath
    }
  }
}
