import React from 'react'
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'
import Prism from 'prismjs'
import _ from 'lodash'

type SubmissionData = {
  id: string
  challengeId: string
  comment: string
  diff: string
  user: {
    id: String
    username: String
  }
  reviewerId: string
  status: string
  updatedAt: string
  createdAt: string
}

type ReviewCardProps = {
  submissionData: SubmissionData
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  //temp fix while CLI tool is getting fixed
  const diff = _.get(submissionData, 'diff', '').replace(/(.?\[\d*m)/g, '')
  const comment = _.get(submissionData, 'comment', '')
  let files: File[] = []

  if (diff) files = gitDiffParser.parse(diff)

  const renderFile = ({ hunks, newPath }: File) => {
    const oldValue: String[] = []
    const newValue: String[] = []

    hunks.forEach(hunk => {
      hunk.changes.forEach(change => {
        if (change.isDelete) oldValue.push(change.content)
        else if (change.isInsert) newValue.push(change.content)
        else {
          oldValue.push(change.content)
          newValue.push(change.content)
        }
      })
    })

    const syntaxHighlight = (str: string): any => {
      if (!str) return

      const language = Prism.highlight(
        str,
        Prism.languages.javascript,
        'javascript'
      )
      return <span dangerouslySetInnerHTML={{ __html: language }} />
    }
    return (
      <ReactDiffViewer
        key={_.uniqueId()}
        oldValue={oldValue.join('\n')}
        newValue={newValue.join('\n')}
        renderContent={syntaxHighlight}
        splitView={false}
        leftTitle={`${newPath}`}
      />
    )
  }
  return (
    <>
      {diff && (
        <div className="card shadow-sm border-0 mt-3 p-3">
          <div className="card-header bg-white">
            <strong>{submissionData.user.username}</strong> submitted Submission
            ID: {submissionData.id}
          </div>
          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              {files.map(renderFile)}
            </div>
          </div>
          <div className="card-footer bg-white">
            {comment && <Markdown>{comment}</Markdown>}
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
