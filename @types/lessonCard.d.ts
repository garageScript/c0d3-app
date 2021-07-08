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
}

export type ReviewButtonProps = {
  isCompleted: boolean
  reviewUrl: string
  lessonId: number
  style?: string
}

export type ReviewCountProps = {
  lessonId: number
}
