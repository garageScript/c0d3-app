import db from './dbload'
const { Lesson } = db

export const lessonExists = async (id: number): Promise<Boolean> => {
  const lesson = await Lesson.findOne({ where: { id } })
  return lesson !== null
}
