import { UserLesson } from './dbload'
import _ from 'lodash'
import { LessonStatus } from '../@types/lesson'

export const hasPassedLesson = async (
  reviewerId: number,
  lessonId: number
): Promise<Boolean> => {
  // query userlesson that belongs to lesson and user
  const userLesson = (await UserLesson.findOne({
    where: {
      lessonId: lessonId,
      userId: reviewerId
    }
  })) as LessonStatus
  return userLesson ? Boolean(userLesson.isPassed) : false
}
