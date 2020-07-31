export type Lesson = {
  id: string
  title: string
  description: string
  order: number
  challenges: Challenge[]
  docUrl: string
  chatUrl: string
  __typename: string
}
