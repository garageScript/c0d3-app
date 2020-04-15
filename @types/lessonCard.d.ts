export type Props = {
  lessonId: number
  coverImg: string
  title: string
  challengeCount: number
  description: string
  currentState?: string
  reviewUrl: string
  challengesUrl: string
  docUrl: string
  shouldNotGetCount?: boolean
}

export type ReviewButtonProps = {
  isCompleted: boolean
  reviewUrl: string
  lessonId: number
  shouldNotGetCount?: boolean
}

export type ReviewCountProps = {
  shouldNotGetCount?: boolean
  lessonId: number
}