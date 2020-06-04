<<<<<<< HEAD
import React from 'react'
=======
import React, { useState } from 'react'
>>>>>>> ecf0f8857399c8e60d676e74696426c8cd30598a
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'
import Prism from 'prismjs'
<<<<<<< HEAD
=======
import { ACCEPT_SUBMISSION, REJECT_SUBMISSION } from '../graphql/queries'
import { useMutation } from '@apollo/react-hooks'
>>>>>>> ecf0f8857399c8e60d676e74696426c8cd30598a
import _ from 'lodash'
import { SubmissionData } from '../@types/submission'

type ReviewCardProps = {
  submissionData: SubmissionData
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const diff = _.get(submissionData, 'diff', '')
  const comment = _.get(submissionData, 'comment', '')
<<<<<<< HEAD
=======
  const [commentValue, setCommentValue] = useState('')
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)
>>>>>>> ecf0f8857399c8e60d676e74696426c8cd30598a
  let files: File[] = []

  if (diff) files = gitDiffParser.parse(diff)

<<<<<<< HEAD
=======
  const reviewSubmission = (review: any) => async () => {
    await review({
      variables: {
        submissionId: submissionData.id,
        comment: commentValue
      }
    })
  }

>>>>>>> ecf0f8857399c8e60d676e74696426c8cd30598a
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
<<<<<<< HEAD
=======
            <textarea
              value={commentValue}
              onChange={e => setCommentValue(e.target.value)}
              placeholder="Type something..."
              style={{ width: '100%', padding: '1rem' }}
            ></textarea>
            <button
              className="btn bg-success m-1 text-white"
              onClick={reviewSubmission(accept)}
            >
              Accept
            </button>

            <button
              className="btn bg-danger m-1 text-white"
              onClick={reviewSubmission(reject)}
            >
              Reject
            </button>
>>>>>>> ecf0f8857399c8e60d676e74696426c8cd30598a
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
