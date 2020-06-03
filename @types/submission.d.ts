export type SubmissionData = {
  id: string
  challengeId: string
  comment: string
  diff: string
  user: {
    id: string
    username: string
  }
  status: string
  updatedAt: string
  createdAt: string
}
