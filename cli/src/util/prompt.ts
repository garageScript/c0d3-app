import { bold } from 'chalk'
import { prompt } from 'enquirer'
import * as message from '../messages'

const QUESTIONS = [
  {
    type: 'input',
    name: 'username',
    message: 'Username:'
  },
  {
    type: 'password',
    mask: '*',
    name: 'password',
    message: 'Password:'
  }
]

const choices: ChoicesFn = array => {
  return array
    .sort((a, b) => a.order - b.order)
    .reduce((acc, cv) => {
      console.log(`Enter ${bold.cyan(cv.order)} to select: ${cv.title}.`)
      acc[cv.order] = cv
      return acc
    }, {} as { [key: number]: any })
}

export const askForChallenges: AskForChallenges = async lessons => {
  const lessonsByOrder = choices(lessons)
  const { lessonOrder }: { lessonOrder: string } = await prompt([
    {
      type: 'input',
      name: 'lessonOrder',
      message: bold.cyan('What lesson do you want to submit?'),
      validate: lessonOrder =>
        !lessonsByOrder[lessonOrder] ? message.PROMPT_ORDER : true
    }
  ])

  console.clear()
  console.log(`\n${bold.cyan(`► ${lessonsByOrder[lessonOrder].title}`)}`)

  const challengeByOrder = choices(lessonsByOrder[lessonOrder].challenges)
  const { challengeOrder }: { challengeOrder: string } = await prompt([
    {
      type: 'input',
      name: 'challengeOrder',
      message: bold.cyan('What challenge do you want to submit?'),
      validate: challengeOrder =>
        !challengeByOrder[challengeOrder] ? message.PROMPT_ORDER : true
    }
  ])

  console.clear()
  console.log(`\n${bold.magenta(`▷ ${lessonsByOrder[lessonOrder].title}`)}`)
  console.log(
    `${bold.magenta(`  ► ${challengeByOrder[challengeOrder].title}`)}`
  )

  return {
    lessonId: lessonsByOrder[lessonOrder].id,
    challengeId: challengeByOrder[challengeOrder].id
  }
}

export const askCredentials = async (): Promise<Credential> => {
  const credential: Credential = await prompt(QUESTIONS)
  if (!credential.username || !credential.password) {
    throw message.WRONG_INPUT
  }

  return credential
}
