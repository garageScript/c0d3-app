const git = require('simple-git')()
const chalk = require('chalk')

const CURRENT_BRANCH = `
You are currently on branch `

const WRONG_BRANCH = `
Submissions must come from branches that are ${chalk.bold.red('not master. ')}
Please make sure that you branch, add, commit, and submit correctly.`

const NO_DIFFERENCE = `
There are ${chalk.bold.red('no differences ')}
in your current branch from your master branch.`

const DIFF = `
Differences from your current branch to master:\n\n`

const checkCurrentBranch = () =>
  new Promise((resolve, reject) => {
    git.branch((error, stdout, stderr) => {
      if (error || stderr) return reject(error || stderr)
      console.log(CURRENT_BRANCH + chalk.bold.blue(stdout.current))
      if (stdout.current === 'master') {
        return reject(WRONG_BRANCH)
      }
      resolve(stdout.current)
    })
  })

const getDiffAgainstMaster = current =>
  new Promise((resolve, reject) => {
    git.diff([`--color`, `master..${current}`], (error, stdout, stderr) => {
      if (error || stderr) return reject(error || stderr)
      if (stdout.length === 0 || stdout === '\n') {
        return reject(NO_DIFFERENCE)
      }

      console.log(DIFF + stdout)
      return resolve()
    })
  })

const createDiff = currentBranch =>
  new Promise((resolve, reject) => {
    git.diff([`master..${currentBranch}`], (error, stdout, stderr) => {
      if (error || stderr) return reject(error || stderr)
      return resolve(stdout)
    })
  })

module.exports = { checkCurrentBranch, getDiffAgainstMaster, createDiff }
