import { UserSubmission } from './challenge'
import { Lesson, LessonStatus } from './lesson'

export type User = {
  id: string
  username: string
}

export type Session = {
  lessons: Lesson[]
  session: {
    user: User
    submissions: UserSubmission[]
    lessonStatus: LessonStatus[]
  }
}
