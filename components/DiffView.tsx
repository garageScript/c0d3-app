import React, { useEffect, memo } from 'react'
import gitDiffParser, { File } from 'gitdiff-parser'
import Prism from 'prismjs'
import ReactDiffViewer, { ReactDiffViewerStylesOverride } from 'c0d3-diff'
import _ from 'lodash'
import CommentBox from './CommentBox'
import { Comment, Submission } from '../graphql'

const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx']

const styles: ReactDiffViewerStylesOverride = {
  lineNumber: {
    fontWeight: 'bold',
    color: '#364d3b'
  },
  gutter: {
    background: '#cdffd8',
    '&:hover': {
      fontSize: '1.2rem',
      opacity: '0.75'
    }
  },
  emptyGutter: {
    pointerEvents: 'none'
  }
}

const DiffView: React.FC<{
  submission: Submission
}> = ({ submission }) => {
  const { diff, id, comments, lessonId, status } = submission
  if (!diff) return <></>
  const files = gitDiffParser.parse(diff)
  type fileComments = Record<string, { lines: number[]; comments: Comment[] }>
  //every file gets unique index in format of submissionId:fileName
  const [commentsState, setCommentsState] = React.useState<fileComments>({})

  useEffect(() => {
    const commentsMap =
      comments &&
      comments.reduce((acc: fileComments, comment) => {
        const index = `${comment.submissionId}:${comment.fileName}`
        if (!acc[index])
          acc[index] = {
            lines: [],
            comments: []
          }
        comment.line && acc[index].lines.push(comment.line)
        acc[index].comments.push(comment)
        return acc
      }, {})
    setCommentsState(commentsMap || {})
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
          {commentsState[`${id}:${newPath}`]?.lines.includes(n) && (
            <CommentBox
              fileName={newPath}
              line={n}
              submissionId={id}
              commentsData={commentsState[`${id}:${newPath}`].comments}
              lessonId={lessonId}
              status={status}
              challengeId={submission.challengeId}
              userId={submission.user.id}
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
        styles={styles}
        onLineNumberClick={(n: string) => {
          //number is a string in format of L-10, R-4 and etc (left-right split views)
          const lineNumber = Number.parseInt(n.split('-')[1])
          const index = `${id}:${newPath}`
          if (!commentsState[index])
            commentsState[index] = { lines: [], comments: [] }
          //remove CommentBox on click if there are no comments for this line
          if (
            commentsState[index].lines.includes(lineNumber) &&
            !commentsState[index].comments.filter(
              comment => comment.line === lineNumber
            )[0]
          ) {
            const copy = _.cloneDeep(commentsState)
            copy[index].lines = copy[index].lines.filter(
              line => line !== lineNumber
            )
            setCommentsState(copy)
          }
          //add new CommentBox on click
          if (!commentsState[index].lines.includes(lineNumber)) {
            const copy = _.cloneDeep(commentsState)
            copy[index].lines.push(lineNumber)
            setCommentsState(copy)
          }
        }}
      />
    )
  }
  return <>{files.map(renderFile)}</>
}

const MemoDiffView = memo(DiffView)

export default MemoDiffView
