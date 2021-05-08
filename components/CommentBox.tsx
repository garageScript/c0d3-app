import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import COMMENT_SUBMISSION from '../graphql/queries/commentSubmission'
import { useGetCommentsQuery, useAddCommentMutation } from '../graphql'
import { File } from 'gitdiff-parser'
import rebuildDiff from '../helpers/rebuildDiff'

const CommentBox: React.FC<{
  line: number
  newPath: string
  files: File[]
  str: string
  lessonId: number
  challengeId: number
  userId: number
  id: number
}> = ({ line, newPath, files, str, lessonId, challengeId, userId, id }) => {
  const [comments, setComments] = useState<String[]>([])
  console.log(userId, 'id')
  const [addComment] = useAddCommentMutation()
  const { data } = useGetCommentsQuery({
    variables: { line, submissionId: challengeId, userId }
  })
  useEffect(() => {
    if (data?.getComments) {
      setComments(data.getComments.map(c => c!.content))
    }
  }, [data])
  const [comment] = useMutation(COMMENT_SUBMISSION)
  const [input, setInput] = useState('')
  const updateFile = (
    _line: number,
    _newPath: string,
    _files: File[],
    str: string
  ) => {
    //there could be only one file with give path
    const edited = _files.filter(f => f.newPath === _newPath)
    const pre = str.split('|||withComment')[0]
    edited[0].hunks.map(h =>
      h.changes.map((c, i) => {
        if (c.content === pre) {
          h.changes[i].content = str
        }
      })
    )
    console.log(edited, 'updated')
    const copyFiles = [..._files]
    copyFiles.map((f, i) => {
      if (f.newPath === newPath) {
        _files[i] = edited[0]
      }
    })
    console.log(copyFiles, 'copiedFullFiles')
    const newDiff = rebuildDiff(copyFiles)
    console.log(id, 'ID')
    comment({
      variables: { diff: newDiff, id: id }
    })
  }
  return (
    <div className="commentBox bg-white">
      {comments.map(c => (
        <p key={c.valueOf()}>{c}</p>
      ))}
      <input
        type="text"
        className="d-block"
        onChange={e => {
          setInput(e.target.value)
        }}
        id="commentBox__input"
        value={input}
      />
      <button
        className="button"
        onClick={async () => {
          setComments([...comments, input])
          updateFile(line, newPath, files, str)
          await addComment({
            variables: {
              line,
              submissionId: challengeId,
              userId,
              content: input
            }
          })
          setInput('')
        }}
      >
        <label htmlFor="commentBox__input">Comment</label>
      </button>
    </div>
  )
}

export default CommentBox
