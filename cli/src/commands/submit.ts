import ora from 'ora'
import request from 'graphql-request'
import boxen from 'boxen'

import * as message from '../messages'
import { Lesson } from '../@types/prompt'
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
    const { lessons } = await request<{ lessons: [Lesson] }>(
      url,
      GET_LESSONS
    ).catch(() => {
      throw new Error(message.FAIL_TO_GET_LESSONS)
    })

    spinner.stop()
    const { lessonId, challengeId } = await askForChallenges(lessons)
    console.log(
      boxen(message.DIFF_MSG + diff, {
        padding: 1,
        borderColor: 'magenta'
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
      throw new Error(message.SUBMISSION_ERROR)
    })
    spinner.succeed(message.SUBMISSION_SUCCEED).stop()
  } catch (error) {
    spinner.fail(error.message)
  }
}

export default submit
