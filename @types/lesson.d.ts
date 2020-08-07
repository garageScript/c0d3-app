export type LessonStatus = {
  isEnrolled: string | null
  isPassed?: string
  isTeaching: string | null
  lessonId: string
  starsReceived?: Star[]
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
  lessonStatus: LessonStatus
  currentUser: User
  docUrl: string
  chatUrl: string
}

export type Star = {
  studentId: number
  mentorId: number
  lessonId: number
  comment?: string
}
