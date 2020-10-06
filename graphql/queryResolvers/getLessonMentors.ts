import { User, UserLesson } from '../../helpers/dbload'

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

    return results.map((result: any) => {
      return { username: result.User.username }
    })
  } catch (err) {
    throw new Error(`An Error was thrown: ${err}`)
  }
}
