import React from 'react'
import fs from 'fs'
import Link from 'next/link'
import path from 'path'
import Layout from '../../components/Layout'
import { getAllLessonPaths } from '../../helpers/static/getAllLessonPaths'
import { LESSONS_PATH } from '../../helpers/static/CONSTANTS'
export default function Index({ lessons }) {
  return (
    <>
      <h1>Curriculum</h1>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.lesson_slug}>
            <Link
              as={`/lesson/${lesson.lesson_slug}/lesson`}
              href={`/lesson/[lesson_slug]/lesson`}
            >
              <a>{lesson.metaData.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

Index.getLayout = (page, pageProps) => <Layout>{page}</Layout>

export async function getStaticProps() {
  const lessons = await getAllLessonPaths().map(
    ({ params: { lesson_slug } }) => {
      const metaPath = path.join(LESSONS_PATH, lesson_slug, 'meta.json')
      const metaData = JSON.parse(fs.readFileSync(metaPath))
      return {
        lesson_slug,
        metaData
      }
    }
  )

  return { props: { lessons } }
}
