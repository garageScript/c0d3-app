import { User, UserLesson } from '../../helpers/dbload'
import { validateLessonId } from '../../helpers/validateLessonId'

type ArgsGetLessonMentors = {
  lessonId: string
}

export const getLessonMentors = async (
  _parent: void,
  args: ArgsGetLessonMentors
): Promise<[User]> => {
  const { lessonId } = args
  try {
    await validateLessonId(parseInt(lessonId))
    const results = await UserLesson.findAll({
      where: { lessonId },
      include: [{ model: User }]
    })

    return results.map(({ User: { username, name, id } }: { User: User }) => {
      return { username, name, id }
    })
  } catch (err) {
    throw new Error(err)
  }
}
