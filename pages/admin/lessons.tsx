import React, { useState } from 'react'
import { AdminLessonsSideBar } from '../../components/admin/lessons/AdminLessonsSideBar'
import LoadingSpinner from '../../components/LoadingSpinner'
import Layout from '../../components/Layout'
import { withGetApp, GetAppProps } from '../../graphql'
import { Lesson } from '../../graphql/index'
import _ from 'lodash'
type AdminLessonsProps = {
  lessons: Lesson[] | undefined
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
}

const AdminLessons: React.FC<AdminLessonsProps> = ({ lessons, setLessons }) => {
  const [selectedLesson, setSelectedLesson] = useState(0)
  return (
    <div className="row mt-4">
      <AdminLessonsSideBar
        setLessons={setLessons}
        selectedLesson={selectedLesson}
        lessons={lessons}
        setSelectedLesson={setSelectedLesson}
      />
      <div key={_.uniqueId()} style={{ textAlign: 'center' }} className="col-8">
        <h1>{selectedLesson}</h1>
      </div>
    </div>
  )
}

const Lessons: React.FC<GetAppProps> = ({ data }) => {
  const { loading, error, lessons, session } = data
  const [lessonsList, setLessons] = useState<null | Lesson[]>(null)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <h1>Error</h1>
  }

  const isAdmin = _.get(session, 'user.isAdmin', false)

  if (isAdmin !== 'true') {
    return (
      <Layout>
        <h1>You must be admin to access this page</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <AdminLessons lessons={lessonsList || lessons} setLessons={setLessons} />
    </Layout>
  )
}

export default withGetApp()(Lessons)
