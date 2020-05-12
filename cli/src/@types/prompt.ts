interface Credential {
  username: string
  password: string
}

interface Challenge {
  id: string
  order: number
  title: string
}

interface Lesson {
  id: string
  order: number
  title: string
  challenges: [Challenge]
}

interface Choices {
  [key: string]: Lesson
}

type ChoicesFn = (array: ArrayValue) => Choices

type List = (array: ArrayValue) => string

type ArrayValue = [Lesson | Challenge]

type AskForChallenges = (
  lessons: [Lesson]
) => Promise<{
  lessonId: string
  challengeId: string
}>
