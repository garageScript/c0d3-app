import { ApolloCache } from '@apollo/client'
import GET_APP from '../graphql/queries/getApp'
import GET_SUBMISSIONS from '../graphql/queries/getSubmissions'
import {
  AddCommentMutation,
  GetAppQuery,
  SubmissionsQuery,
  Submission
} from '../graphql'

import { RecursivePartial } from '../@types/recursivePartial'
import _ from 'lodash'
/*
  update function modifies client cache after mutation
  lessonId prop is used to differentiate between student and reviewer 
  student data comes from GetApp query while reviewer uses getSubmission query
  closure is used because apollo requires it to pass additional arguments 
  (update function has only two arguments - cache and result of query)
*/
export const updateCache = (
  submissionId: number,
  content: string,
  name: string,
  username: string,
  lessonId?: number,
  line?: number,
  fileName?: string
) => {
  return (cache: ApolloCache<AddCommentMutation>) => {
    if (lessonId) {
      const data = cache.readQuery<SubmissionsQuery>({
        query: GET_SUBMISSIONS,
        variables: { lessonId }
      })
      const current = data!.submissions?.filter(s => s!.id === submissionId)
      const copy = _.cloneDeep(current) as RecursivePartial<Submission>[]
      copy[0]!.comments!.push({
        content,
        fileName,
        line,
        submissionId,
        author: {
          name,
          username
        }
      })
      const newData = data!.submissions!.map(s => {
        if (s!.id === submissionId) return copy[0]
        return s
      })
      cache.writeQuery({
        query: GET_SUBMISSIONS,
        variables: { lessonId },
        data: { ...data, submissions: newData }
      })
    } else {
      const data = cache.readQuery<GetAppQuery>({
        query: GET_APP
      })
      const current = data!.session!.submissions!.filter(
        s => s!.id === submissionId
      )
      const copy = _.cloneDeep(current) as RecursivePartial<Submission>[]
      copy[0]!.comments!.push({
        content,
        fileName,
        line,
        submissionId,
        author: {
          name,
          username
        }
      })
      const newData = {
        ...data,
        session: { ...data!.session, submissions: copy }
      }
      cache.writeQuery({
        query: GET_APP,
        data: newData
      })
    }
  }
}
