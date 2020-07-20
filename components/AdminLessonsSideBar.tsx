import React from 'react'
import { Lesson } from '../@types/adminLesson'

type SideBarLessonProps = {
  lessons: Lesson[]
  setLessons: React.Dispatch<React.SetStateAction<null>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<number>>
}

const lessonsListCallbackFn = (
  obj: { title: string },
  i: number,
  setSelectedLesson: any
) => {
  return (
    <div key={i} data-testid="challenge-title" className="card mb-2">
      <div className="btn d-flex justify-content-center">
        <div
          style={{ wordBreak: 'break-word' }}
          onClick={() => setSelectedLesson(i)}
        >
          <h4 style={{ margin: 'auto', wordBreak: 'break-word' }}>
            {obj.title}
          </h4>
        </div>
      </div>
    </div>
  )
}

const makeLessonsList = (lessons: any, setSelectedLesson: any) => {
  const lessonList = lessons.map((obj: { title: string }, i: number) => {
    return lessonsListCallbackFn(obj, i, setSelectedLesson)
  })

  lessonList.push(
    lessonsListCallbackFn(
      { title: 'Create New Lesson' },
      lessonList.length,
      setSelectedLesson
    )
  )
  return lessonList
}

//test contains order, so do lessons.lessons[order] to get correct lesson info for lessinINfo
export const AdminLessonsSideBar: React.FC<SideBarLessonProps> = ({
  lessons,
  setSelectedLesson
}) => {
  const lessonsList = lessons
    ? makeLessonsList(lessons, setSelectedLesson)
    : [<h1 key={0}>Create new Lesson</h1>]

  return <div className="col-4">{lessonsList}</div>
}
