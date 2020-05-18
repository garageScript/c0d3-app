import gitP, { SimpleGit } from 'simple-git/promise'
import * as message from '../messages'

const git: SimpleGit = gitP()

export const getDiffAgainstMaster = async () => {
  const { current } = await git.branch()
  if (current === 'master') throw new Error(message.WRONG_BRANCH)
  console.log(`${message.CURRENT_BRANCH} ${current}\n`)

  const diff = await git.diff([`--color`, `master..${current}`])
  if (!Boolean(diff)) throw new Error(message.NO_DIFFERENCE)

  return diff
}
