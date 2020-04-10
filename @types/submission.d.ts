import { Challenge } from './challenge'

export type Submission = {
  id: string
  status: string
  mrUrl: string
  diff: string
  viewCount: number
  comment: string
  userId: string
  order: number
  lessonId: string
  challengeId: string
  challenge: Challenge
  reviewerId: string
  createdAt: string
  updatedAt: string
}
