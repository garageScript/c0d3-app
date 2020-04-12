// import types
import { Lesson, LessonData } from '../../@types/lesson'

class LessonsController {
  private _lessons: Lesson[]

  constructor(data: LessonData) {
    this._lessons = []
    if (data) {
      this._lessons = this.sort(data.curriculumStatus)
    }
  }

  public getLessonState(lesson: Lesson, idx: number): string {
    const lessonInProgressIdx = this.getLessonIdxInProgress()
    let lessonState = ''
    if (
      lesson.currentUser.userLesson.isEnrolled ||
      idx === lessonInProgressIdx
    ) {
      lessonState = 'inProgress'
    }
    if (lesson.currentUser.userLesson.isPassed) {
      lessonState = 'completed'
    }
    return lessonState
  }

  public lessons(): Lesson[] {
    return this._lessons
  }

  public getLesson(index: number): Lesson | null {
    if (index < 0 || index >= this._lessons.length) {
      return null
    }
    return this._lessons[index]
  }

  public getLessonIdxInProgress(): number {
    return this._lessons.findIndex(
      lesson => !lesson.currentUser.userLesson.isPassed
    )
  }

  private sort(lessons: Lesson[]) {
    return lessons.sort((a, b) => a.order - b.order)
  }
}

export default LessonsController
