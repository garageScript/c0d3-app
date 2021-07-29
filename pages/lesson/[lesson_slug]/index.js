import React, { useEffect } from 'react'
import Link from 'next/link'
import { getLayout } from '../../../components/LessonLayout'

import { getAllLessonPaths } from '../../../helpers/static/getAllLessonPaths'
import { getLessonMetaData } from '../../../helpers/static/getLessonMetaData'
import { getSubLessonMDXSource } from '../../../helpers/static/getSubLessonMDXSource'
import { useRouter } from 'next/router'
const Index = ({ lesson_slug, sublesson_slug }) => {
  // Auto redirect client side to first sublesson
  const router = useRouter()
  useEffect(() => {
    router.replace(
      '/lesson/[lesson_slug]/[sublesson_slug]',
      `/lesson/${lesson_slug}/${sublesson_slug}`
    )
  }, [])

  return <>Loading...</>
}

Index.getLayout = getLayout

export default Index

export async function getStaticPaths() {
  return {
    paths: await getAllLessonPaths(),
    fallback: false
  }
}

export async function getStaticProps({ params: { lesson_slug } }) {
  const metaData = await getLessonMetaData(lesson_slug)
  const subLessons = await getSubLessonMDXSource({ lesson_slug })
  const firstSubLesson = subLessons.find(
    sublesson => sublesson.frontMatter.order === 1
  )

  return {
    props: {
      lesson_slug,
      sublesson_slug: firstSubLesson.sublesson_slug,
      metaData // Consumed by LessonLayout
    }
  }
}
