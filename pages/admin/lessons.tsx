import React, { useState } from 'react'
import { AdminLessonInfo } from '../../components/admin/lessons/AdminLessonInfo'
import { AdminLessonsSideBar } from '../../components/admin/lessons/AdminLessonsSideBar'
import { withGetApp, GetAppProps } from '../../graphql'
import { Lesson } from '../../graphql/index'
import { AdminLayout } from '../../components/admin/AdminLayout'
import Error, { StatusCode } from '../../components/Error'
import LoadingSpinner from '../../components/LoadingSpinner'
const Lessons: React.FC<GetAppProps> = ({ data }) => {
  const { loading, error, lessons } = data
  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <Error code={StatusCode.INTERNAL_SERVER_ERROR} message={error.message} />
    )
  }
  const [selectedLesson, setSelectedLesson] = useState(0)
  const [lessonsList, setLessons] = useState<null | Lesson[]>(null)
  return (
    <AdminLayout data={data}>
      <div className="row mt-4">
        <AdminLessonsSideBar
          setLessons={setLessons}
          selectedLesson={selectedLesson}
          lessons={lessonsList || lessons}
          setSelectedLesson={setSelectedLesson}
        />
        <AdminLessonInfo
          setLessons={setLessons}
          lessons={lessonsList || lessons}
          selectedLesson={selectedLesson}
        />
      </div>
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
