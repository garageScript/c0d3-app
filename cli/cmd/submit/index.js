const { URL } = require('url')
const { request } = require('graphql-request')
const credService = require('../util/credentials.js')

const { GET_LESSONS, POST_SUBMISSION } = require('../util/graphql')
const { promptForLessons, promptForChallenge } = require('../util/promptHelper')
const {
  checkCurrentBranch,
  getDiffAgainstMaster,
  createDiff
} = require('../util/gitHelper')

const ENDPOINT = '/api/graphql'

module.exports = async inputs => {
  try {
    const IS_TEST = process.env.TEST === true
    const testToken = '1txkbwq0v1kHhzyGZaf53'
    const url = inputs.url
      ? new URL(ENDPOINT, inputs.url)
      : new URL(ENDPOINT, 'https://c0d3.com')

    let { isTokenValid, cliToken } = await credService.verifyToken(url)

    if (!isTokenValid) {
      const credentials = await credService.askCredentials()
      cliToken = await credService.getToken(credentials, url)
      credService.saveToken(cliToken)
    }

    const currentBranch = await checkCurrentBranch()
    await getDiffAgainstMaster(currentBranch)

    const { lessons } = await request(url, GET_LESSONS)
    const currentLesson = await promptForLessons(lessons)
    const challengeId = await promptForChallenge(currentLesson)
    const diff = await createDiff(currentBranch)
    const variables = {
      lessonId: currentLesson.id,
      cliToken: IS_TEST ? testToken : cliToken,
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
