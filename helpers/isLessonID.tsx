import { LessonID } from '../@types/lesson'
export default function isLessonID(arg: LessonID | string): arg is LessonID {
  return ['1', '2', '3', '4', '5', '24', '25', '27', '28', '29'].includes(arg)
}
