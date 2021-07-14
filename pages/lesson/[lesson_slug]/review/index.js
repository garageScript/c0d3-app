import React from 'react'
import Layout from '../../../../components/Layout'
import LessonLayout from '../../../../components/LessonLayout'
import { getAllLessonPaths } from '../../../../helpers/static/getAllLessonPaths'
import { getLessonMetaData } from '../../../../helpers/static/getLessonMetaData'

export default function ReviewIndex({ lessons }) {
  return <>Review Index Placeholder</>
}
ReviewIndex.getLayout = (page, pageProps) => {
  const { source, metaData } = pageProps
  return (
    <Layout title={source?.scope?.title}>
      <LessonLayout metaData={metaData} isPassed={true}>
        {page}
      </LessonLayout>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllLessonPaths()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { lesson_slug } }) {
  const metaData = await getLessonMetaData(lesson_slug)
  return {
    props: {
      lesson_slug,
      metaData
    }
  }
}
