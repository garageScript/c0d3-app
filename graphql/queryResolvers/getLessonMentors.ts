import db from '../../helpers/dbload'

const { User, UserLesson } = db

type ArgsGetLessonMentors = {
  lessonId: string
}

export const getLessonMentors = async (
  _parent: void,
  args: ArgsGetLessonMentors
) => {
  const { lessonId } = args
  try {
    const results = await UserLesson.findAll({
      where: { lessonId },
      include: [{ model: User }]
    })

    if (!results.length) return null

    return results.map((result: any) => {
      return result.User
    })
  } catch (err) {
    throw new Error(`An Error was thrown: ${err}`)
  }
}
