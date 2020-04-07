export type LessonStatus = {
  isEnrolled: string | null
  isPassed?: string
  isTeaching: string | null
}

export type User = {
  userLesson: LessonStatus
}

export type Lesson = {
  id: number
  title: string
  description: string
  order: number
  challenges: Challenge[]
  currentUser: User
  docUrl: string
}
