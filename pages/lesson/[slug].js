import React, { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import { MDXRemote } from 'next-mdx-remote'
import { getAllLessonPaths } from '../../lib/getAllLessonsPaths'
import { getLessonMDXSource } from '../../helpers/getLessonMDXSource'

const Lesson = ({ slug, source }) => {
  console.log('almost there', source)

  return (
    <Layout title={source?.scope?.title}>
      {/* Casting alerts as any until type is migrated */}
      <MDXRemote {...source} />
    </Layout>
  )
}

export default Lesson

export async function getStaticPaths() {
  const paths = getAllLessonPaths()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const source = await getLessonMDXSource(slug)

  return {
    props: {
      slug,
      source
    }
  }
}
