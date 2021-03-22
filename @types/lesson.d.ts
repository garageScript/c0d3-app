export type LessonStatus = {
  isEnrolled: string | null
  isPassed?: string
  isTeaching: string | null
  lessonId: string
  starsReceived?: Star[]
  starGiven?: string
}

export type User = {
  userLesson: LessonStatus
}

export type Lesson = {
  id: string
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
  lessonTitle: string
  lessonDifficulty: number
  studentUsername: string
  studentName: string
  comment?: string
}
