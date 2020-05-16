import boxen from 'boxen'
import { bold, cyan } from 'chalk'
import { prompt } from 'enquirer'

import { Credential, ChoicesFn, List, AskForChallenges } from '../@types/prompt'
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
      acc[cv.order] = cv
      return acc
    }, {} as { [key: number]: any })
}

const list: List = array => {
  return array.reduce((acc, cv) => {
    return (acc += `Enter ${cyan(cv.order)} to select: ${cyan(cv.title)}\n`)
  }, '')
}
export const askForChallenges: AskForChallenges = async lessons => {
  const lessonsByOrder = choices(lessons)
  console.log(
    boxen(list(lessons).trimEnd(), {
      padding: 1,
      borderColor: 'magenta',
      // @ts-ignore error TS2748:
      // Cannot access ambient const enums when the '--isolatedModules' flag is provided.
      borderStyle: boxen.BorderStyle.Round
    })
  )
  const { lessonOrder }: { lessonOrder: string } = await prompt([
    {
      type: 'input',
      name: 'lessonOrder',
      message: cyan('What lesson do you want to submit?'),
      validate: lessonOrder =>
        !lessonsByOrder[lessonOrder] ? message.PROMPT_ORDER : true
    }
  ])

  console.clear()
  console.log(`\n${bold.cyan(`► ${lessonsByOrder[lessonOrder].title}`)}`)

  const challengeByOrder = choices(lessonsByOrder[lessonOrder].challenges)
  console.log(
    boxen(list(lessonsByOrder[lessonOrder].challenges).trimEnd(), {
      padding: 1,
      borderColor: 'magenta',
      // @ts-ignore error TS2748:
      // Cannot access ambient const enums when the '--isolatedModules' flag is provided.
      borderStyle: boxen.BorderStyle.Round
    })
  )
  const { challengeOrder }: { challengeOrder: string } = await prompt([
    {
      type: 'input',
      name: 'challengeOrder',
      message: cyan('What challenge do you want to submit?'),
      validate: challengeOrder =>
        !challengeByOrder[challengeOrder] ? message.PROMPT_ORDER : true
    }
  ])

  console.clear()
  console.log(`\n${bold.cyan(`▷ ${lessonsByOrder[lessonOrder].title}`)}`)
  console.log(`${bold.cyan(`  ► ${challengeByOrder[challengeOrder].title}`)}`)

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
