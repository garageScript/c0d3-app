import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AdminLessonsInfo } from '../../components/AdminLessonsInfo'
import { AdminLessonsSideBar } from '../../components/AdminLessonsSideBar'
import LoadingSpinner from '../../components/LoadingSpinner'
import checkAdminRights from '../../graphql/queries/checkAdminRights'
import Layout from '../../components/Layout'
import getLessons from '../../graphql/queries/getLessons'

const AdminLessons: React.FC = () => {
  const { loading, error, data } = useQuery(getLessons)
  const [lessons, setLessons] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(0)

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      {error && <h1>Error</h1>}
      {data && (
        <div className="row mt-4">
          <AdminLessonsSideBar
            setLessons={setLessons}
            lessons={lessons || data.lessons}
            setSelectedLesson={setSelectedLesson}
          />
          <AdminLessonsInfo
            setLessons={setLessons}
            lessons={lessons || data.lessons}
            selectedLesson={selectedLesson}
          />
        </div>
      )}
    </Layout>
  )
}

const Lessons: React.FC = () => {
  const { loading, error, data } = useQuery(checkAdminRights)

  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      {error && <h1>Error</h1>}
      {data && data.adminRights && <AdminLessons />}]
    </React.Fragment>
  )
}

export default Lessons
