import React, { useRef } from 'react'
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'
import Prism from 'prismjs'
import { ACCEPT_SUBMISSION, REJECT_SUBMISSION } from '../graphql/queries'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import { SubmissionData } from '../@types/submission'

type ReviewCardProps = {
  submissionData: SubmissionData
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const diff = _.get(submissionData, 'diff', '')
  const comment = _.get(submissionData, 'comment', '')
  const commentTextField = useRef(null)
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)
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
            <textarea ref={commentTextField} placeholder="Type something..." style={{ width: '100%', padding: '1rem' }}></textarea>
            <button
              className="btn bg-success m-1 text-white"
              onClick={async () => {
                const textField = commentTextField.current as any
                await accept({ variables: { submissionId: submissionData.id, comment: textField.value } })
                window.location.reload()                
              }}
            >
              Accept
            </button>

            <button
              className="btn bg-danger m-1 text-white"
              onClick={async () => {
                const textField = commentTextField.current as any
                await reject({ variables: { submissionId: submissionData.id, comment: textField.value } })
                window.location.reload()
              }}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
