import React from 'react'
import { Lesson } from '../../../graphql/index'

type SideBarLessonProps = {
  lessons: Lesson[] | undefined
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<number>>
}

type LessonProps = {
  obj: { title: string }
  i: number
  setSelectedLesson: React.Dispatch<React.SetStateAction<number>>
}

const LessonTitle: React.FC<LessonProps> = ({ obj, setSelectedLesson, i }) => (
  <div key={i} data-testid="challenge-title" className="card mb-2">
    <div className="btn d-flex justify-content-center">
      <div
        style={{ wordBreak: 'break-word' }}
        onClick={() => setSelectedLesson(i)}
      >
        <h4 style={{ margin: 'auto', wordBreak: 'break-word' }}>{obj.title}</h4>
      </div>
    </div>
  </div>
)

export const AdminLessonsSideBar: React.FC<SideBarLessonProps> = ({
  lessons,
  setSelectedLesson
}) => {
  const lessonListData = lessons || []

  //check if create new lesson has already been pushed to the lessons array
  const lastIndex = lessonListData.length - 1
  const { title } = lessonListData[lastIndex]
  if (title !== 'Create New Lesson') {
    lessonListData.push({ title: 'Create New Lesson' })
  }
  const lessonList = lessonListData.map((obj: any, i: number) => (
    <LessonTitle
      key={i}
      i={i}
      obj={obj}
      setSelectedLesson={setSelectedLesson}
    />
  ))

  return <div className="col-4 mt-4">{lessonList}</div>
}
