export interface Credential {
  username: string
  password: string
}

export interface Challenge {
  id: string
  order: number
  title: string
}

export interface Lesson {
  id: string
  order: number
  title: string
  challenges: [Challenge]
}

export interface Choices {
  [key: string]: Lesson
}

export type ChoicesFn = (array: ArrayValue) => Choices

export type List = (array: ArrayValue) => string

export type ArrayValue = [Lesson | Challenge]

export type AskForChallenges = (
  lessons: [Lesson]
) => Promise<{
  lessonId: string
  challengeId: string
}>
