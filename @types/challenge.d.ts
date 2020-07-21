export type Challenge = {
  title: string
  id: string
  order: number
  description: string
}

export type ChallengeSubmissionData = {
  title: string
  id: string
  order: number
  description: string
  status: string
  submission?: UserSubmission
}

export type Reviewer = {
  id: string
  username: string
}

export type UserSubmission = {
  id: string
  status: string
  mrUrl: string
  diff: string
  viewCount: number
  comment?: string
  challengeId: string
  lessonId?: string
  reviewer?: Reviewer
  reviewerId: string
  createdAt: string
  updatedAt: string
}

export type UserSubmissionsObject = {
  [submissionId: string]: UserSubmission
}
