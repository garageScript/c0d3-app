import React, { useEffect, memo } from 'react'
import gitDiffParser, { File } from 'gitdiff-parser'
import Prism from 'prismjs'
import ReactDiffViewer, { ReactDiffViewerStylesOverride } from 'c0d3-diff'
import _ from 'lodash'
import CommentBox from './CommentBox'
import { Comment, Submission, SubmissionStatus } from '../graphql'
import CopyButton from './CopyButton'
import scssStyles from '../scss/diffView.module.scss'

const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx']

const styles: ReactDiffViewerStylesOverride = {
  lineNumber: {
    fontWeight: 'bold',
    color: '#525252'
  },
  gutter: {
    background: '#cdffd8',
    '&:hover': {
      opacity: '0.75'
    }
  },
  emptyGutter: {
    display: 'none'
  },
  diffContainer: {
    display: 'block',
    overflowX: 'auto',
    marginBottom: '14px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px'
  },
  titleBlock: {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    border: '1px solid #eee',
    gridAutoFlow: 'column',
    columnGap: '10px'
  },
  toolbar: {
    display: 'flex'
  },
  rightTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block'
  }
}

const DiffView: React.FC<{
  submission: Submission
  generalStatus: SubmissionStatus | undefined
}> = ({ submission, generalStatus }) => {
  const { diff, id, comments, lessonId } = submission
  if (!diff) return <></>
  const files = gitDiffParser.parse(diff)
  type fileComments = Record<string, { lines: number[]; comments: Comment[] }>
  //every file gets unique index in format of submissionId:fileName
  const [commentsState, setCommentsState] = React.useState<fileComments>({})
  const [viewableStates, setViewableStates] = React.useState(
    new Array(files.length).fill(false)
  )

  useEffect(() => {
    const commentsMap = comments?.reduce((acc: fileComments, comment) => {
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

  const renderFile = ({ hunks, newPath }: File, fileIdx: number) => {
    const newValue: string[] = []
    if (!hunks.length || !newPath) return
    const extension = newPath.split('.').pop()!

    let language = extension === 'html' ? 'jsx' : extension

    if (!prismLanguages.includes(language)) language = 'javascript'
    hunks.forEach(hunk => {
      hunk.changes.forEach(change => {
        // If it's not a line that's supposed to look delete
        if (!(change.type === 'delete')) newValue.push(change.content)
      })
    })
    const syntaxHighlight = (str: string, n: number) => {
      const highlighted = Prism.highlight(
        str,
        Prism.languages[language],
        language
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
              status={generalStatus}
              challengeId={submission.challengeId}
              userId={submission.user.id}
              submission={submission}
            />
          )}
        </>
      )
    }

    const toolbar = () => (
      <>
        <div
          className={`${scssStyles.checkBoxBorder} form-check pe-2 me-2 border rounded`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id={`checkBox-${id}-${fileIdx}`}
            checked={viewableStates[fileIdx]}
            onChange={() => {
              const newViewableStates = [...viewableStates]
              newViewableStates[fileIdx] = !newViewableStates[fileIdx]
              setViewableStates(newViewableStates)
            }}
          />
          <label
            className="form-check-label text-muted"
            htmlFor={`checkBox-${id}-${fileIdx}`}
          >
            Viewed
          </label>
        </div>
        <CopyButton value={newValue.join('\n')} />
      </>
    )

    return (
      <div className="position-relative" key={fileIdx}>
        <div className={scssStyles.diffView}>
          <ReactDiffViewer
            toolbar={toolbar}
            key={_.uniqueId()}
            newValue={!viewableStates[fileIdx] ? newValue.join('\n') : ''}
            renderContent={syntaxHighlight}
            splitView={false}
            leftTitle={`${newPath}`}
            styles={
              viewableStates[fileIdx]
                ? {
                    ...styles,
                    titleBlock: {
                      border: '1px solid #eee',
                      borderRadius: '8px'
                    }
                  }
                : styles
            }
            onLineNumberClick={(n: string) => {
              if (generalStatus !== SubmissionStatus.Open) return
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
        </div>
      </div>
    )
  }
  return <>{files.map(renderFile)}</>
}

const MemoDiffView = memo(DiffView)

export default MemoDiffView
