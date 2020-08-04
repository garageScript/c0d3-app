import React, { useState } from 'react'
import { AdminLessonInfo } from '../../components/admin/lessons/AdminLessonInfo'
import { AdminLessonsSideBar } from '../../components/admin/lessons/AdminLessonsSideBar'
import { withGetApp, GetAppProps } from '../../graphql'
import { Lesson } from '../../graphql/index'
import { AdminLayout } from '../../components/admin/AdminLayout'
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
      <AdminLessonInfo
        setLessons={setLessons}
        lessons={lessons}
        selectedLesson={selectedLesson}
      />
    </div>
  )
}

const Lessons: React.FC<GetAppProps> = ({ data }) => {
  const [lessonsList, setLessons] = useState<null | Lesson[]>(null)
  const { lessons } = data
  return (
    <AdminLayout data={data}>
      <AdminLessons lessons={lessonsList || lessons} setLessons={setLessons} />
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
