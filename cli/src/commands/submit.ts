import ora from 'ora'
import request from 'graphql-request'
import boxen from 'boxen'

import * as message from '../messages'
import { askForChallenges, askCredentials } from '../util/prompt'
import { DEBUG_TOKEN } from '../constants'
import { GET_LESSONS, POST_SUBMISSION } from '../graphql'
import { getDiffAgainstMaster } from '../util/git'
import { getToken, saveToken, verifyToken } from '../util/credentials'

const spinner = ora()

const submit = async ({
  url,
  debug
}: {
  url: string
  debug: boolean
}): Promise<any> => {
  try {
    let { isTokenValid, cliToken } = await verifyToken(url)

    if (!isTokenValid && !debug) {
      const credentials = await askCredentials()
      spinner.start('Login...')
      cliToken = await getToken(credentials, url)
      await saveToken(cliToken)
    }

    const diff = await getDiffAgainstMaster()
    spinner.start('Loading...')
    const { lessons }: { lessons: [Lesson] } = await request(
      url,
      GET_LESSONS
    ).catch(() => {
      throw message.FAIL_TO_GET_LESSONS
    })
    spinner.stop()
    const { lessonId, challengeId } = await askForChallenges(lessons)
    console.log(
      boxen(message.DIFF_MSG + diff, {
        padding: 1,
        borderColor: 'magenta',
        borderStyle: boxen.BorderStyle.Round
      })
    )
    const variables = {
      lessonId,
      challengeId,
      cliToken: debug ? DEBUG_TOKEN : cliToken,
      diff
    }

    spinner.start('Sending...')
    await request(url, POST_SUBMISSION, variables).catch(() => {
      throw message.SUBMISSION_ERROR
    })

    spinner.succeed(message.SUBMISSION_SUCCEED).stop()
  } catch (error) {
    spinner.fail(error)
    process.exit()
  }
}

export default submit
