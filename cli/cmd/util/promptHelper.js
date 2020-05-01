const chalk = require('chalk')
const prompt = require('prompt')

const LESSON_ORDER = `
The lesson number needs to be a non-negative integer.
To cancel submission, press Ctrl + d
`
const CHALLENGE_ORDER = `
The challenge number needs to be a non-negative integer.
To cancel submission, press Ctrl + d
`

const promptForLessons = lessons => {
  const lessonsByOrder = lessons
    .sort((a, b) => a.order - b.order)
    .reduce((acc, { order, id, title, challenges }) => {
      console.log(`Enter ${order} to submit to lesson: ${title}.`)
      acc[order] = {
        title,
        challenges,
        id
      }
      return acc
    }, {})

  const schema = {
    properties: {
      lessonOrder: {
        description: chalk.rgb(84, 64, 216).bold('Lesson order'),
        pattern: /^[0-9][0-9]*$/,
        message: chalk.red(LESSON_ORDER),
        required: true
      }
    }
  }

  prompt.message = ''
  prompt.start()
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      const { lessonOrder } = result
      const currentLesson = lessonsByOrder[lessonOrder]
      if (err) return reject(err)
      if (!currentLesson) {
        return reject(chalk.red('\nThe lesson number you gave does not exist!'))
      }
      const lesson = chalk.bold.blue(`${lessonOrder} - ${currentLesson.title}`)
      console.log('\nCommand-line input received:')
      console.log(`  Lesson Number: ${lesson}\n`)
      return resolve(currentLesson)
    })
  })
}

const promptForChallenge = currentLesson => {
  const challengesByOrder = currentLesson.challenges
    .sort((a, b) => a.order - b.order)
    .reduce((acc, { title, order, id }) => {
      console.log(`Enter ${order} to submit to challenge: ${title}. `)
      acc[order] = {
        title,
        id
      }
      return acc
    }, {})

  const schema = {
    properties: {
      challengeOrder: {
        description: chalk.rgb(84, 64, 216).bold('Challenge order'),
        pattern: /^[0-9][0-9]*$/,
        message: CHALLENGE_ORDER,
        required: true
      }
    }
  }

  prompt.message = ''
  prompt.start()
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      const { challengeOrder } = result
      const currentChallenge = challengesByOrder[challengeOrder]
      if (err) return reject(err)
      if (!currentChallenge) {
        return reject(
          chalk.red('\nThe challenge assigned to the number did not exist!')
        )
      }
      const challenge = chalk.bold.blue(
        `${challengeOrder} - ${currentChallenge.title}`
      )
      console.log('Command-line input received:')
      console.log(`  Challenge Number: ${challenge}\n`)
      return resolve(currentChallenge.id)
    })
  })
}

module.exports = {
  promptForLessons,
  promptForChallenge
}
