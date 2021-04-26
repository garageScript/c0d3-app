import { useMutation } from '@apollo/client'

import React, { memo, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import gitDiffParser, { File } from 'gitdiff-parser'
import ReactDiffViewer from 'react-diff-viewer'

import Prism from 'prismjs'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../graphql/queries/rejectSubmission'
import { Submission } from '../graphql/index'

import _ from 'lodash'

import { Button } from './theme/Button'
import { Text } from './theme/Text'
import { MdInput } from './MdInput'

dayjs.extend(relativeTime)

type ReviewCardProps = {
  submissionData: Submission
}

type DiffViewProps = {
  diff?: string
}

const prismLanguages = ['js', 'javascript', 'html', 'css', 'json', 'jsx']

export const DiffView: React.FC<DiffViewProps> = ({ diff = '' }) => {
  const files = gitDiffParser.parse(diff)

  const renderFile = ({ hunks, newPath }: File) => {
    const newValue: String[] = []
    if (!hunks.length || !newPath) return
    let extension = newPath.split('.').pop() || prismLanguages[0]
    if (!prismLanguages.includes(extension)) {
      extension = 'javascript'
    }

    hunks.forEach(hunk => {
      hunk.changes.forEach(change => {
        if (!change.isDelete) newValue.push(change.content)
      })
    })

    const syntaxHighlight = (str: string): any => {
      if (!str) return

      const language = Prism.highlight(
        str,
        Prism.languages[extension],
        extension
      )
      return <span dangerouslySetInnerHTML={{ __html: language }} />
    }

    return (
      <ReactDiffViewer
        key={_.uniqueId()}
        newValue={newValue.join('\n')}
        renderContent={syntaxHighlight}
        splitView={false}
        leftTitle={`${newPath}`}
      />
    )
  }

  return <>{files.map(renderFile)}</>
}

const MemoDiffView = memo(DiffView)
type UserProfileProps = {
  username: string | undefined | null
  name: string | undefined | null
}
const UserProfile: React.FC<UserProfileProps> = ({ username, name }) => {
  //TO-DO fix User type to make these fields non-nulled
  const firstName = name ? name.split(' ')[0] : ''
  const lastName = name ? name.split(' ')[1] : ''
  return (
    <div className="d-flex flex-column align-items-center justify-content-between">
      <div className="text-center">{`${firstName} ${
        lastName ? lastName : ''
      }`}</div>
      <div className="text-md-left text-muted font-weight-bold mb-0">
        {username ? '@' + username : 'Anonymous user'}
      </div>
    </div>
  )
}
export const ReviewCard: React.FC<ReviewCardProps> = ({ submissionData }) => {
  const {
    id,
    diff,
    comment,
    updatedAt,
    user,
    challenge,
    lessonId,
    reviewer
  } = submissionData
  const [commentValue, setCommentValue] = useState('')
  const [accept] = useMutation(ACCEPT_SUBMISSION)
  const [reject] = useMutation(REJECT_SUBMISSION)

  const reviewSubmission = (review: any) => async () => {
    await review({
      variables: {
        submissionId: id,
        lessonId,
        comment: commentValue
      }
    })
  }
  return (
    <>
      {diff && (
        <div className="card shadow-sm border-0 mt-3">
          <div className="card-header bg-white">
            <h4>
              {user?.username} -{' '}
              <span className="text-primary">{challenge?.title}</span>
            </h4>
            <Text color="lightgrey" size="sm">
              {dayjs(parseInt(updatedAt || '0')).fromNow()}
            </Text>
          </div>

          <div className="card-body">
            <div className="rounded-lg overflow-hidden">
              <MemoDiffView diff={diff} />
            </div>
          </div>

          <div className="card-footer bg-white">
            {comment && (
              <div className="container">
                <div className="row">
                  <div className="col-2">
                    <UserProfile
                      username={reviewer?.username}
                      name={reviewer?.name}
                    />
                  </div>
                  <div className="col-10 align-self-center ">
                    <Markdown>{comment}</Markdown>
                  </div>
                </div>
              </div>
            )}
            <MdInput onChange={setCommentValue} bgColor={'white'} />
            <Button
              m="1"
              type="success"
              color="white"
              onClick={reviewSubmission(accept)}
            >
              Accept
            </Button>

            <Button
              m="1"
              type="danger"
              color="white"
              onClick={reviewSubmission(reject)}
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard
