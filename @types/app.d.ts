import { UserSubmission } from './challenge'
import { Lesson, LessonStatus } from './lesson'
import { User } from './user'
import { AlertData } from './alerts'

export type AppData = {
  lessons: Lesson[]
  session: {
    user: User
    submissions: UserSubmission[]
    lessonStatus: LessonStatus[]
  } | null
  alerts: AlertData[]
}
