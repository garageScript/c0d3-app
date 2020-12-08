export type SubmissionData = {
  id: string
  challengeId: string
  lessonId: string
  comment: string
  diff: string
  challenge: {
    title: string
  }
  user: {
    id: string
    username: string
  }
  status: string
  updatedAt: string
  createdAt: string
}
