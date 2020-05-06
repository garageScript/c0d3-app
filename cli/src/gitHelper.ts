import gitP, { SimpleGit } from 'simple-git/promise'
import chalk from 'chalk'

const git: SimpleGit = gitP()

const CURRENT_BRANCH = `
You are currently on branch: `

const WRONG_BRANCH = `
Submissions must come from branches that are ${chalk.bold.red('not master. ')}
Please make sure that you branch, add, commit, and submit correctly.`

const NO_DIFFERENCE = `
There are ${chalk.bold.red('no differences ')}
in your current branch from your master branch.`

const DIFF_MSG = `
${chalk.bold.blue('Differences from your current branch to master:')}\n\n`

export const checkCurrentBranch = async () => {
  const { current } = await git.branch()
  if (current === 'master') {
    throw WRONG_BRANCH
  }
  console.log(`${CURRENT_BRANCH} ${chalk.bold.blue(current)}\n`)
  return current
}

export const getDiffAgainstMaster = async (
  current: string
): Promise<string> => {
  const diff = await git.diff([`--color`, `master..${current}`])
  if (!Boolean(diff)) {
    throw NO_DIFFERENCE
  }

  return DIFF_MSG + diff
}
