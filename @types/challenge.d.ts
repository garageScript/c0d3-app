export type Challenge = {
  title: string
  id: string
  order: number
  description: string
}

export type UserSubmission = {
  id: string
  status: string
  mrUrl: string
  diff: string
  viewCount: number
  comment: string
  challengeId: string
  reviewerId: string
  createdAt: string
  updatedAt: string
}
