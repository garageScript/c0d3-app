import db from './dbload'
const { Lesson } = db

export const validateLessonId = async (
  id: number,
  errMsg?: string
): Promise<true> => {
  try {
    const lesson = await Lesson.findOne({ where: { id } })
    if (!lesson) {
      throw new Error(errMsg || 'lessonId does not exist in database')
    }
    return true
  } catch (err) {
    throw new Error(err)
  }
}
