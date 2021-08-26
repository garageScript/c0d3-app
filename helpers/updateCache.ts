import { ApolloCache } from '@apollo/client'
import GET_PREVIOUS_SUBMISSIONS from '../graphql/queries/getPreviousSubmissions'
import {
  AddCommentMutation,
  Submission,
  GetPreviousSubmissionsQuery
} from '../graphql'

import _ from 'lodash'
/*
  update function modifies client cache after mutation
  closure is used because it's the only way to pass additional arguments to update function 
  (update has only two arguments - cache and result of query)
*/

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export const updateCache = (
  submissionId: number,
  content: string,
  name: string,
  username: string,
  lessonId?: number,
  line?: number,
  fileName?: string,
  challengeId?: number,
  userId?: number
) => {
  return (cache: ApolloCache<AddCommentMutation>) => {
    const data = cache.readQuery<GetPreviousSubmissionsQuery>({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: {
        lessonId,
        challengeId,
        userId
      }
    })
    if (!data) throw new Error('No cache to update')
    const current = data.getPreviousSubmissions?.filter(
      s => s.id === submissionId
    )
    const copy = _.cloneDeep(current) as RecursivePartial<Submission>[]
    if (!copy.length)
      throw new Error('Incorrect submission id (no submission was found)')
    copy[0].comments!.push({
      content,
      fileName,
      line,
      submissionId,
      author: {
        name,
        username
      }
    })
    const newData = data?.getPreviousSubmissions?.map(s => {
      if (s.id === submissionId) return copy[0]
      return s
    })
    cache.writeQuery({
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: { lessonId, challengeId, userId },
      data: { ...data, getPreviousSubmissions: newData }
    })
  }
}
