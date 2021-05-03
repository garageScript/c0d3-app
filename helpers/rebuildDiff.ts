import { File } from 'gitdiff-parser'

const rebuildDiff = (files: File[]): string => {
  let result = ''
  files.forEach(f => {
    result += 'diff --git '
    result += `a/${f.newPath} b/${f.oldPath}\n`
    result+=`index ${f.oldRevision}..${f.newRevision} ${f.oldMode}\n`
    result += `--- a/${f.newPath}\n`
    result += `+++ b/${f.oldPath}\n`
    f.hunks.forEach(h => {
      result += `${h.content}\n`
      h.changes.forEach(c => {
        if (c.isDelete) result += `-${c.content}\n`
        else if (c.isInsert) result += `+${c.content}\n`
        else result += ` ${c.content}\n`
      })
    })
  })
  return result.slice(0,result.length-1)
}

export default rebuildDiff
