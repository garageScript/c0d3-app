import db from './dbload'
const { Lesson } = db

export const validateLessonId = async (
  id: number,
  errMsg?: string
): Promise<true> => {
  try {
    if (await Lesson.findOne({ where: { id } })) {
      return true
    }
    throw new Error(errMsg || 'lessonId does not exist in database')
  } catch (err) {
    throw new Error(err)
  }
}
