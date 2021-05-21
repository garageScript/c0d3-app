import React, { useEffect, memo } from 'react'
import gitDiffParser, { File } from 'gitdiff-parser'
import Prism from 'prismjs'
import ReactDiffViewer from 'c0d3-diff'
import _ from 'lodash'
import CommentBox from './CommentBox'
import { Comment } from '../graphql'

const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx']

const DiffView: React.FC<{
  diff?: string
  id: number
  name: string
  username: string
  comments: Comment[]
  lessonId?: number
  status?: string
}> = ({ diff = '', id, name, username, comments, lessonId, status }) => {
  const files = gitDiffParser.parse(diff)
  type fileComments = Record<string, { lines?: number[]; comments?: Comment[] }>
  //every file gets unique index in format of submissionId:fileName
  const [commentsState, setCommentsState] = React.useState<fileComments>({})

  useEffect(() => {
    const commentMap: fileComments = {}
    comments &&
      comments.forEach(c => {
        if (!commentMap[`${c.submissionId}:${c.fileName}`])
          commentMap[`${c.submissionId}:${c.fileName}`] = {
            lines: [],
            comments: []
          }
        commentMap[`${c.submissionId}:${c.fileName}`].lines!.push(c.line)
        commentMap[`${c.submissionId}:${c.fileName}`].comments!.push(c)
      })
    setCommentsState(commentMap)
    //rerunning useEffect on id rerenders submission when student clicks on another challenge
  }, [id, comments])

  const renderFile = ({ hunks, newPath }: File) => {
    const newValue: string[] = []

    if (!hunks.length || !newPath) return
    let extension = newPath.split('.').pop()!
    if (!prismLanguages.includes(extension)) extension = 'javascript'
    hunks.forEach(hunk => {
      hunk.changes.forEach(change => {
        if (!change.isDelete) newValue.push(change.content)
      })
    })

    const syntaxHighlight = (str: string, n: number): any => {
      const highlighted = Prism.highlight(
        str,
        Prism.languages[extension],
        extension
      )
      return (
        <>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
          {commentsState[`${id}:${newPath}`]?.lines?.includes(n) && (
            <CommentBox
              fileName={newPath}
              line={n}
              submissionId={id}
              commentsData={commentsState[`${id}:${newPath}`].comments}
              name={name}
              username={username}
              lessonId={lessonId}
              status={status}
            />
          )}
        </>
      )
    }

    return (
      <ReactDiffViewer
        key={_.uniqueId()}
        newValue={newValue.join('\n')}
        renderContent={syntaxHighlight}
        splitView={false}
        leftTitle={`${newPath}`}
        onLineNumberClick={(n: string) => {
          //line number is a string in format of L-10, R-4 and etc (left-right split views)
          const lineNumber = Number.parseInt(n.split('-')[1])
          if (!commentsState[`${id}:${newPath}`])
            commentsState[`${id}:${newPath}`] = { lines: [], comments: [] }
          if (commentsState[`${id}:${newPath}`].lines!.includes(lineNumber))
            return
          const copy = _.cloneDeep(commentsState)
          copy[`${id}:${newPath}`].lines?.push(lineNumber)
          setCommentsState(copy)
        }}
      />
    )
  }
  return <>{files.map(renderFile)}</>
}

const MemoDiffView = memo(DiffView)

export default MemoDiffView
