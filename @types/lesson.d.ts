export type LessonStatus = {
  isEnrolled: string | null
  isPassed?: string
  isTeaching: string | null
  lessonId: string
  starsReceived?: Star[]
  starGiven?: Star
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

export type LessonID =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '24'
  | '25'
  | '27'
  | '28'
  | '29'
