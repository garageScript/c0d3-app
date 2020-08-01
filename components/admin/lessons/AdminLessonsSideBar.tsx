import React from 'react'
import { Lesson } from '../../../graphql/index'

type SideBarLessonProps = {
  lessons: Lesson[] | undefined
  selectedLesson: number
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<number>>
}

export const AdminLessonsSideBar: React.FC<SideBarLessonProps> = ({
  lessons,
  setSelectedLesson,
  selectedLesson
}) => {
  const lessonListData = lessons || []

  //check if create new lesson has already been pushed to the lessons array
  const lastIndex = lessonListData.length - 1
  const { title } = lessonListData[lastIndex]
  if (title !== 'Create New Lesson') {
    lessonListData.push({ title: 'Create New Lesson' })
  }
  const lessonList = lessonListData.map((obj: any, arrIndex: number) => (
    <a
      key={arrIndex}
      data-testid="challenge-title"
      role="tab"
      className={arrIndex === selectedLesson ? 'nav-link active' : 'nav-link'}
      data-toggle="pill"
      style={{ wordBreak: 'break-word', cursor: 'pointer' }}
      onClick={() => setSelectedLesson(arrIndex)}
    >
      {obj.title}
    </a>
  ))

  return (
    <div className="col-4 mt-4 ">
      <div
        className="nav flex-column nav-pills"
        role="tablist"
        aria-orientation="vertical"
      >
        {lessonList}
      </div>
    </div>
  )
}
