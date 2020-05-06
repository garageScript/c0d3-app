import chalk from 'chalk'
import request from 'graphql-request'

import { askCredentials, getToken, saveToken, verifyToken } from './credentials'
import { GET_LESSONS, POST_SUBMISSION } from './graphql'
import { promptForChallenge, promptForLessons } from './promptHelper'
import { checkCurrentBranch, getDiffAgainstMaster } from './gitHelper'

const DEBUG_TOKEN = '1txkbwq0v1kHhzyGZaf53'

const submit = async ({ url, debug }: { url: string; debug: boolean }) => {
  try {
    let { isTokenValid, cliToken } = await verifyToken(url)

    if (!isTokenValid) {
      const credentials = await askCredentials()
      cliToken = await getToken(credentials, url)
      await saveToken(cliToken)
    }

    const currentBranch = await checkCurrentBranch()
    const diff = await getDiffAgainstMaster(currentBranch)
    const { lessons } = await request(url, GET_LESSONS)
    const currentLesson = await promptForLessons(lessons)
    const challengeId = await promptForChallenge(currentLesson)
    console.log(diff)
    const variables = {
      lessonId: 'currentLesson.id',
      cliToken: debug ? DEBUG_TOKEN : cliToken,
      diff,
      challengeId,
      url
    }

    await request(url, POST_SUBMISSION, variables).then(result => {
      if (!result || !result.createSubmission) {
        return console.log(
          chalk.bold.red(
            '\nYour submission was not successfully sent. Please try again.'
          )
        )
      }
      console.log('\nYour submission was successfully received')
    })
  } catch (error) {
    console.error(`${error}\n`)
  }
}

export default submit
